const { config } = require("../../config");
const passportFacebook = require('koa-passport');
const facebookStrategy = require('passport-facebook').Strategy;

// ↓ ****** INICIO - PASSPORT-FACEBOOK ****** ↓
passportFacebook.use(new facebookStrategy({
    clientID: config.FACEBOOK_APP_ID,
    clientSecret: config.FACEBOOK_SECRET_KEY,
    callbackURL: '/auth/facebook/callback',
    profileFields: ["id", "displayName", "photos", "emails"],
    scope: ["email"]
}, (accessToken, refreshSecret, profile, done)=>{
    const facebookUser = {
        userName: profile.displayName,
        userImg: profile.photos[0].value,
        userEmail: profile.emails[0].value
    }

    done(null, facebookUser);
}));

passportFacebook.serializeUser(function (user, cb) {
    cb(null, user);
});

passportFacebook.deserializeUser(function (user, cb) {
    cb(null, user);
});
// ↑ ****** FIN - PASSPORT-FACEBOOK ****** ↑

module.exports = { passportFacebook }