var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var user = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: "604043265630-k9pvklmbh5fktmfg7jt3lcl6f4ruq5ul.apps.googleusercontent.com",
    clientSecret: "t4h4v4Ajo3BLPfWgjh4IE7wd",
    callbackURL: "https://backendkopdar.herokuapp.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    user.FindOrCreate({name: profile.displayName},{name: profile.displayName,userid: profile.id},
      function(err,user){
          if(err){return done(err);}
          done(null,user);
      });
    console.log(profile.id);
  }
));
module.exports = passport;