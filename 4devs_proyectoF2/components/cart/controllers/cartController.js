const cartServices = require('../services/cartServices');
const { administrator } = require('../../../utils/constants');
const productsServices = require('../../products/services/productsServices');

class Cart {
    async getID(req, res, next) {
        const { id } = req.params;
    
        const cart = await cartServices.getID(id);
        res.json({ cart, administrator });
    };
    
    async create(req, res, next) {
        const id = await cartServices.create();
        res.json({ id });
    };

    async add(req, res, next) {
        const { id } = req.params;
        const { id_prod } = req.body;
        
        // USO EL SERVICIO DE PRODUCTOS, desde el controlador cart:
        const product = await productsServices.getID(id_prod);
        await cartServices.add(id, product);
        res.json({});
    };
    
    async delete(req, res, next) {
        const { id } = req.params;
        
        await cartServices.delete(id);
        res.json({});
    };

    async deleteProduct(req, res, next) {
        const { id, id_prod } = req.params;
        
        await cartServices.deleteProduct(id, id_prod);
        res.json({});
    };
}

module.exports = new Cart();