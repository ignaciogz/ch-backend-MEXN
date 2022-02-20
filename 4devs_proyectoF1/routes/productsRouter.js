const productsMw = require('../middlewares/productsMw');

// VARIABLES Globales ↓
const global = require('../config/globalVariables');
const productManager = global.productManager;
const administrator = global.administrator;
// VARIABLES Globales ↑

const express = require("express");
const { Router } = express;

const productsRoute = new Router();

productsRoute.all('/', productsMw.access);
productsRoute.all('/:id', productsMw.access);

productsRoute.get('/', (req, res) => {
    res.json({products: productManager.getAll(), administrator});
})
 
productsRoute.get('/:id', productsMw.productExist, (req, res) => {
    const { id } = req.params;

    res.json({product: productManager.getID(id), administrator});
})

productsRoute.post('/', (req, res) => {
    const newProduct = req.body;

    productManager.add(newProduct);
    res.json({});
})

productsRoute.put('/:id', productsMw.productExist, (req, res) => {
    const { id } = req.params;
    const modifiedProduct = req.body;
    
    productManager.update(parseInt(id), modifiedProduct);
    res.json({});
})

productsRoute.delete('/:id', productsMw.productExist, (req, res) => {
    const { id } = req.params;
    
    productManager.delete(id);
    res.json({});
})

module.exports = productsRoute;