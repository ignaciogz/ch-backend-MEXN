const service = require('../services/product');

const getProducts = async (req, res) => {
    try {
        const response = await service.getAll();
        res.json(response);
    } catch (error) {
        console.log(error);
    }
};

const postProduct = async (req, res) => {
    try {
        const product = req.body;
        await service.save(product);
        res.json(product);
    } catch (error) {
        console.log(error);
    }
};

const putProduct = async (req, res) => {
    try {
        const product = req.body;
        await service.update(product.id, product.data);
        res.json(product);
    } catch (error) {
        console.log(error);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = req.body;
        await service.deleteById(product.id);
        res.json(product);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { 
    getProducts,
    postProduct,
    putProduct,
    deleteProduct
};