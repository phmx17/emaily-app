const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');   // extract model class; 1 arg = pull out; 2 args = insert

passport.serializeUser((user, done) => {    // turn user model instance (object passed from done() in passport.use) with property .id into a cookie
    done(null, user.id);    // this is: mongoDB _id
});
// cookieSession and these two serialize functions work together behind the scenes.
// cookies and passport get hooked up together in index.js with app.use()
passport.deserializeUser((id, done) => {    // turn id into a mongoose instance
    User.findById(id)
    .then(user => {
        done(null, user);   // user is that db instance
    });
});

passport.use(new GoogleStrategy({   // implements 'google' as the identifier listed below in passport.authenticate()
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',    // route after User grants permission; path registered in google cloud platform 
    proxy: true // tell Google to trust our heroku proxy hosting 
    }, 
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id })  //  profile.id = googleId        
        if (existingUser) {
            return done(null, existingUser); // tell passport null errors and user found
        }        
        const user = await new User({ googleId: profile.id }).save()  //  save (async) the model instance to the database
        done(null, user);    // veryfy async call
           
    }
));    
