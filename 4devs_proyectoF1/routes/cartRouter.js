const Cart = require('../class/Cart');

// VARIABLES Globales ↓
const global = require('../config/globalVariables');
const productManager = global.productManager;
const administrator = global.administrator;
// VARIABLES Globales ↑

const express = require("express");
const { Router } = express;

const cartRoute = new Router();
const cartManager = new Cart();
 
cartRoute.get('/:id/productos', (req, res) => {
    // c) LISTA todos los items del carrito, a partir del ID del carrito
    const { id } = req.params;

    res.json({cart: cartManager.getID(id), administrator});
})

cartRoute.post('/', async (req, res) => {
    // a) CREAR un carrito, y DEVUELVE el ID del carrito creado
    const id = await cartManager.create();
    res.json({id});
})

cartRoute.post('/:id/productos', (req, res) => {
    // d) AGREGA un producto al carrito
    const { id } = req.params;
    const { id_prod } = req.body;
    
    const product = productManager.getID(id_prod);
    cartManager.add(id, product);
    res.json({});
})

cartRoute.delete('/:id', (req, res) => {
    // b) ELIMINA todo el carrito
    const { id } = req.params;
    
    cartManager.delete(id);
    res.json({});
})

cartRoute.delete('/:id/productos/:id_prod', (req, res) => {
    // e) ELIMINA un producto especifico del carrito
    const { id, id_prod } = req.params;
    
    cartManager.deleteProduct(id, id_prod);
    res.json({});
})

module.exports = cartRoute;