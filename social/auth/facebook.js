var passport = require('passport'),facebookstrategy=require('passport-facebook').Strategy;
var user = require('../models/User');

passport.use(new facebookstrategy({
    clientID: "352575901957767",
    clientSecret: "584261e1c89439a50a2d858ee76f9860",
    callbackURL: ""
},
function(accessToken,refreshToken,profile,done){
    user.FindOrCreate({name: profile.displayName},{name: profile.displayName,userid: profile.id},
        function(err,user){
            if(err){return done(err);}
            done(null,user);
        });
}
));

module.exports = passport;