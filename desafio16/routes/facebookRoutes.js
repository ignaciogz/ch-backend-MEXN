const express = require('express');
const { passportFacebook } = require("../config/passportAuth");

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