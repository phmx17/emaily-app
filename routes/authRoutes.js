const passport = require('passport'); // npm module

module.exports = (app) => {
// request to Google for profile and email access; a unique 'code' is returned
app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']    
}));
// get 'code' from the URL and let passport resolve it to a profile using GoogleStrategy, which already knows that this is round two of the process; 
app.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    (req,res) => {
        res.redirect('/surveys')
    }
); // the callback function (accessToken...) => {} gets invoked here

app.get('/api/logout', ((req, res) => {
   req.logout();    // passport attaches .logout()
   res.redirect('/');           
}))

app.get('/api/current_user', (req, res) => {    
    res.send(req.user);
    // res.send(req.session);  // passport stores extracted cookie data in here: mongoose id
    });
};
