const express = require('express');
const passport= require('passport');
const FacebookStrategy= require('passport-facebook');
const GoogleStrategy=require('passport-google-oauth20');
// Import Facebook and Google OAuth apps configs
const facebook= require('./config');
const google= require('./config');

// Transform Facebook profile because Facebook and Google profile objects look different
// and we want to transform them into user objects that have the same set of attributes
const transformFacebookProfile = (profile) => ({
  name: profile.name,
  avatar: profile.picture.data.url,
});

// Transform Google profile into user object
const transformGoogleProfile = (profile) => ({
  name: profile.displayName,
  avatar: profile.image.url,
});

// Register Facebook Passport strategy
passport.use(new FacebookStrategy(facebook,
  async (accessToken, refreshToken, profile, done)
    => done(null, transformFacebookProfile(profile._json))
));

// Register Google Passport strategy
passport.use(new GoogleStrategy(google,
  async (accessToken, refreshToken, profile, done)
    => done(null, transformGoogleProfile(profile._json))
));

// Serialize user into the sessions
passport.serializeUser((user, done) => done(null, user));

// Deserialize user from the sessions
passport.deserializeUser((user, done) => done(null, user));

// Initialize http server
const app = express();

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Set up Facebook auth routes
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }),
  // Redirect user back to the mobile app using Linking with a custom protocol OAuthLogin
  (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));

// Set up Google auth routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google' }),
  (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));

// Launch the server on the port 3000
const server = app.listen(process.env.port || 3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});

// const express = require('express'),
//     app = express(),
//     passport = require('passport'),
//     auth = require('./config'),
//     cookieParser = require('cookie-parser'),
//     cookieSession = require('cookie-session');
//     app.use(cookieSession({
//       name: 'session',
//       keys: ['123']
//   }));
//   app.use(cookieParser());
// auth(passport);
// app.use(passport.initialize());
// app.get('/', (req, res) => {
//     res.json({
//         status: 'session cookie not set'
//     });
// });
// app.get('/auth/google', passport.authenticate('google', {
//     scope: ['https://www.googleapis.com/auth/userinfo.profile']
// }));
// app.get('/auth/google/callback',
//     passport.authenticate('google', {failureRedirect:'/'}),
//     (req, res) => {
//         req.session.token = req.user.token;
//         res.redirect('/');
//     }
// );
// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });