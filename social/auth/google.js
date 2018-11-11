var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var user = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: "604043265630-k9pvklmbh5fktmfg7jt3lcl6f4ruq5ul.apps.googleusercontent.com",
    clientSecret: "t4h4v4Ajo3BLPfWgjh4IE7wd",
    callbackURL: "https://backendkopdar.herokuapp.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('Test');
       user.FindOrCreate({ userid: profile.id }, { name: profile.displayName,userid: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));
module.exports = passport;