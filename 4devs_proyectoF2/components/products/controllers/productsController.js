const productsServices = require('../services/productsServices');
const { administrator } = require('../../../utils/constants');

class Products {
    async getAll(req, res, next) {
        const products = await productsServices.getAll();
        res.json({ products, administrator });
    };

    async getID(req, res, next) {
        const { id } = req.params;
    
        const product = await productsServices.getID(id);
        res.json({ product, administrator });
    };
    
    async add(req, res, next) {
        const newProduct = req.body;
    
        const id = await productsServices.add(newProduct);
        res.json({ id });
    };
    
    async update(req, res, next) {
        const { id } = req.params;
        const modifiedProduct = req.body;
        
        await productsServices.update(parseInt(id), modifiedProduct);
        res.json({});
    };
    
    async delete(req, res, next) {
        const { id } = req.params;
        
        await productsServices.delete(id);
        res.json({});
    };

    // Extras
    async productExist(req, res ,next) {
        const { id } = req.params;
    
        const productExist = await productsServices.productIDExist(id)
        productExist ? next() : res.json({ error : 'producto no encontrado' });
    }
}

module.exports = new Products();