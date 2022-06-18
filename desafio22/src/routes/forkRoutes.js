const express = require('express');
const controller = require('../controllers/fork');

const forkRouter = express.Router();

forkRouter.get('/api/randoms', controller.getRandoms);

module.exports = forkRouter;