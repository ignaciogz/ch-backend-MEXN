const Router = require('koa-router');
const controller = require('../controllers/usuario');

const userRouter = new Router({
    prefix: "/api/usuario"
});

userRouter.get('/', controller.getUsuario);

module.exports = userRouter;