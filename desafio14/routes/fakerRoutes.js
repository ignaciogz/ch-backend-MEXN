const express = require('express');
const path = require('path');
let faker = require("faker");

module.exports = app => {
    const router = express.Router();
    app.use('/faker', router);

    router.get('/productos-test', (req, res) => {
        res.sendFile('faker.html', { root: path.resolve('public') });
    });
    
    router.get('/api/productos-test', (req, res) => {
        try {
            faker.locale = "es";
            const arrayProductosAleatorios = [];
            
            for (let i = 0; i < 5; i++) {
                const producto = {
                    title: faker.commerce.product(),
                    price: faker.commerce.price(),
                    thumbnail: faker.image.abstract(640, 480, true)
                }
    
                arrayProductosAleatorios.push(producto);
            }
    
            res.json({ arrayProductosAleatorios });
        } catch (error) {
            console.log(error);
        }
    });
}