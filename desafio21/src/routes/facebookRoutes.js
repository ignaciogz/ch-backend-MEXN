const express = require('express');
const { passportFacebook } = require("../utils/passport/facebook");

const facebookRouter = express.Router();

facebookRouter.get('/', passportFacebook.authenticate('facebook'));

facebookRouter.get('/callback', 
    passportFacebook.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login-error'
    })
);

module.exports = facebookRouter;