const express = require('express');
const controller = require('../controllers/process');

const processRouter = express.Router();

processRouter.get('/info', controller.getInfoPage);
processRouter.get('/api/info', controller.getInfo);

module.exports = processRouter;