const cartServices = require('../services/cartServices');
const { administrator } = require('../../../utils/constants');

class Cart {
    getID(req, res, next) {
        const { id } = req.params;
    
        res.json({cart: cartServices.getID(id), administrator});
    };
    
    async create(req, res, next) {
        const id = await cartServices.create();
        res.json({id});
    };

    add(req, res, next) {
        const { id } = req.params;
        const { id_prod } = req.body;
        
        // NECESITO USAR EL SERVICIO DE PRODUCTOS, desde el servicio cart.
        // Pero NO vimos comunicacion entre servicios propios
        
        const product = null;
        //const product = productsServices.getID(id_prod);
        cartServices.add(id, product);
        res.json({});
    };
    
    delete(req, res, next) {
        const { id } = req.params;
        
        cartServices.delete(id);
        res.json({});
    };

    deleteProduct(req, res, next) {
        const { id, id_prod } = req.params;
        
        cartServices.deleteProduct(id, id_prod);
        res.json({});
    };
}

module.exports = new Cart();