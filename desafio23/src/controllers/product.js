const service = require('../services/product');

const getProducts = async (ctx) => {
    try {
        const response = await service.getAll();
        ctx.body = response;
    } catch (error) {
        console.log(error);
    }
};

const postProduct = async (ctx) => {
    try {
        const product = ctx.request.body;
        await service.save(product);
        ctx.body = product;
    } catch (error) {
        console.log(error);
    }
};

const putProduct = async (ctx) => {
    try {
        const product = ctx.request.body;
        await service.update(product.id, product.data);
        ctx.body = product;
    } catch (error) {
        console.log(error);
    }
};

const deleteProduct = async (ctx) => {
    try {
        const product = ctx.request.body;
        await service.deleteById(product.id);
        ctx.body = product;
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