var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: "604043265630-jp3qfd0fnrc488q06q4q3043l49r008h.apps.googleusercontent.com",
    clientSecret: "2nJsgCOYpRjXTc2W7WiGDCcX",
    callbackURL: "https://backendkopdar.herokuapp.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ userid: profile.id }, { name: profile.displayName,userid: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));

module.exports = passport;