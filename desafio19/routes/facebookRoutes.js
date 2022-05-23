const express = require('express');
const { passportFacebook } = require("../utils/passport/facebook");

module.exports = app => {
    const router = express.Router();
    app.use('/auth/facebook', router);

    router.get('/', passportFacebook.authenticate('facebook'));

    router.get('/callback', 
        passportFacebook.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/login-error'
        })
    );
}