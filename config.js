export const facebook ={
    clientID: '352575901957767',
    clientSecret: '584261e1c89439a50a2d858ee76f9860',
    callbackURL:'https://192.168.1.100:3000/auth/facebook/callback',
    profileFields: ['id','token' ,'name', 'displayName', 'picture', 'email'],
};
export const google = {
    clientID: '604043265630-k9pvklmbh5fktmfg7jt3lcl6f4ruq5ul.apps.googleusercontent.com',
    clientSecret: 'ig1SG1M2PwJPRD_SIPJiCecj',
    callbackURL: 'http://192.168.1.100:3000/auth/google/callback',
  };

// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// module.exports = (passport) => {
//     passport.serializeUser((user, done) => {
//         done(null, user);
//     });
//     passport.deserializeUser((user, done) => {
//         done(null, user);
//     });
//     passport.use(new GoogleStrategy({
//             clientID:'604043265630-k9pvklmbh5fktmfg7jt3lcl6f4ruq5ul.apps.googleusercontent.com',
//             clientSecret: 'ig1SG1M2PwJPRD_SIPJiCecj',
//             callbackURL: 'http://localhost:3000/auth/google/callback'
//         },
//         (token, refreshToken, profile, done) => {
//             return done(null, {
//                 profile: profile,
//                 token: token
//             });
//         }));
// };