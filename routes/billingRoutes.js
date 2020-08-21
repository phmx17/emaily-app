const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

// reach out to stripe with token; make the actual charge and update user's account with actual credits
// in chrome tools can go to 'stripe' request and look in headers and scroll down to payload for all details in the token
module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => { // requireLogin is a reference to a function; it does not get called with (); it runs internally        
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });
    req.user.credits += 5  // req.user allows access to model of currently logged user; passport and cookieSession made this happen
    const user = await req.user.save();
    res.send(user); 
    })
}