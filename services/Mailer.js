const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();
        this.sgApi = sendgrid(keys.sendGridKey); // required in above
        this.from_email = new helper.Email('slimyelow@gmail.com');   // 'no-reply@emaily.com' is not allowed by sendgrid anymore 
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);
        this.addContent(this.body)  // necessary; .addContent() is from base class
        this.addClickTracking();
        this.addRecipients();
    }
    // extract each email from the array of objects and create an array of Email instances
    formatAddresses(recipients) {
       return recipients.map(({ email }) => {   // {} needs to get wrapped in () because naked destructure into arrow will throw error
        return new helper.Email(email); 
       }); 
    };
    addClickTracking() {
        // documentation tells to just write this code and don't ask questions
        const trackingSettings = new helper.TrackingSettings();
        const ClickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(ClickTracking);
        this.addTrackingSettings(trackingSettings);
    }
    
    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient)    //  add each recipient to personalize object
        });
        this.addPersonalization(personalize);   //  function provided by Mail base class
    }
    // send the mailer off to API
    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON() //  sendgrid provided function
        })
        const response = await this.sgApi.API(request); // send off the mailer to sg api; API is a sg provided function
        return response;
    }
}
module.exports = Mailer; 