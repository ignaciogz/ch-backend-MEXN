const express = require('express');
const controller = require('../controllers/faker');

const fakerRouter = express.Router();

fakerRouter.get('/productos-test', controller.getProductos_testPage);
fakerRouter.get('/api/productos-test', controller.getProductos_test);

module.exports = fakerRouter;