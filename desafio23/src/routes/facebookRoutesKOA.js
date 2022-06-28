const Router = require('koa-router');
const { passportFacebook } = require("../utils/passport/facebook");

const facebookRouter = new Router({
    prefix: "/auth/facebook"
});

facebookRouter.get('/', passportFacebook.authenticate('facebook'));

facebookRouter.get('/callback', 
    passportFacebook.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login-error'
    })
);

module.exports = facebookRouter;