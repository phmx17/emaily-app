const _ = require('lodash');
const { Path } = require('path-parser');    // don't change this!
const { URL } = require('url'); // default module in Node js 
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const SurveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await  Survey.find({ _user: req.user.id })
        .select({ recipients: false });
        
        res.send(surveys);
    })


    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send(`<h1 style="
        display: block;
        margin: 30px auto;
        width: 80%;
        text-align: center;
        font-family: Arial; 
        color: #ccc;
        background: #444;
        padding: 20px;
        ">Thanks for submitting.</h1>`)
    });

    // webhooks handler; from Sendgrid packets: extract surveyId, choice ('yes' or 'no') and user's email
    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice') // creates a blueprint with vars surveyId and choice       
        
        _.chain(req.body)
            .map(({ email, url }) => {    // ES6 destructure
                // step 1: URL extracts pathname from route; step 2: .test() creates an obj with kvps: 'surveyId' and 'choice'; results in 'null' if either are missing
                match = p.test(new URL(url).pathname);
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice } 
                }
            })
            .compact()  // filters out falsey elements in this case 'nulls' returned by p.test()
            .uniqBy('email', 'surveyId') // filters out duplicates containing both identical email and surveyId
            .each(({ surveyId, email, choice }) => {    // mongoose query for updating DB only if user has not already responded 
                Survey.updateOne({  // 1st obj = query
                    _id: surveyId,
                    recipients: {   // in subdoc collection find element that matches the following criteria
                        $elemMatch: { email: email, responded: false }
                    }
                }, {    // 2nd obj = instructions for the update
                    $inc: { [choice]: 1},   // yes: type: number ; no: type: number; [] = es2016 key interpolation at js runtime
                    $set: { 'recipients.$.responded' : true },  // $ refers to $elemMatch above
                    lastResponded: new Date
                }).exec();
            })
            .value();            
        res.send({}) // to confirm receipt, otheriwse sendgrid will resend web hooks
    })    

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
       const { title, subject, body, recipients } = req.body;   

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })), // transform CSL into [] of obj and trim spaces; () around {} assert obj and not code block
            _user: req.user.id,
            dateSent: Date.now()
         });
        // send email here; async
        const mailer = new Mailer(survey, SurveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save(); // store a fresh copy of user (returned), since current one is stale
            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }

    });     
}; 