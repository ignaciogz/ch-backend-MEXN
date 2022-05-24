const express = require('express');
const controller = require('../controllers/usuario');

const processRouter = express.Router();

processRouter.get('/', controller.getUsuario);

module.exports = processRouter;