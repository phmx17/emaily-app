// https://rocky-ridge-45341.herokuapp.com

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
// const bodyParser = require('body-parser'); // does not work anymore: 05.05.2020

const keys = require('./config/keys');  // module exports with object containing keys, etc.

require('./models/User');
require('./models/Survey');
require('./services/passport'); // run passport, no return required

mongoose.connect(keys.mongoURI);

const app = express();

// hooking up middlewarez
// app.use(bodyParser.json);  // :@@: causes app to crash!!!!
app.use(express.json());    // This works; Body Parser doesn't !!!
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,    // 30 days before expiration
        keys: [keys.cookieKey]  // cookie encryption
    })
);
app.use(passport.initialize());
app.use(passport.session());    // tell passport to use cookieSession; used for (de)serializeUser() functions in passport.js 

/*** these routhandlers must come after cookieSession and other middlewarez!! ; ORDER MATTERS !!! ****/
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);  
require('./routes/surveyRoutes')(app);

/*** following rules apply to production environment; handle requests for React client routes, files, producton assets
Express will also serve up client's index.html file if requested route is not recognized */
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));    // see if request matches up with file; if not, continue
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); // last step
    })
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('listening on 5000'));

 