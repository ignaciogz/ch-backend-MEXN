const express = require('express');
const authMw = require("../utils/middlewares/authMiddleware");

const controller = require('../controllers/general');

const generalRouter = express.Router();

generalRouter.all('*', controller.allLogearPeticionRecibida);
generalRouter.get('/', authMw.isAuth, controller.getHomePage);
generalRouter.get('/registro', authMw.isNotAuth, controller.getRegistroPage);
generalRouter.get('/login', authMw.isNotAuth, controller.getLoginPage);
generalRouter.post('/login', controller.postLogin);
generalRouter.get('/logout', controller.getLogout);
generalRouter.delete('/logout', controller.deleteLogout);

// Errores
generalRouter.get("/login-error", controller.getLogin_errorPage);
generalRouter.get("/registro-error", controller.getRegistro_errorPage);

module.exports = generalRouter;