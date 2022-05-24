const service = require('../services/faker');
const path = require('path');

const getProductos_testPage = (req, res) => {
    res.sendFile('faker.html', { root: path.resolve('public') });
};

const getProductos_test = (req, res) => {
    try {
        const arrayProductosAleatorios = service.generarProductosAleatorios();

        res.json({ arrayProductosAleatorios });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getProductos_testPage, getProductos_test }