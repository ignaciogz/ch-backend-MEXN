const productsServices = require('../services/productsServices');
const { administrator } = require('../../../utils/constants');

class Products {
    getAll(req, res, next) {
        res.json({products: productsServices.getAll(), administrator});
    };

    getID(req, res, next) {
        const { id } = req.params;
    
        res.json({product: productsServices.getID(id), administrator});
    };
    
    add(req, res, next) {
        const newProduct = req.body;
    
        productsServices.add(newProduct);
        res.json({});
    };
    
    update(req, res, next) {
        const { id } = req.params;
        const modifiedProduct = req.body;
        
        productsServices.update(parseInt(id), modifiedProduct);
        res.json({});
    };
    
    delete(req, res, next) {
        const { id } = req.params;
        
        productsServices.delete(id);
        res.json({});
    };

    // Extras
    access(req, res ,next) {
        const method = req.method;
    
        if(!administrator && method != "GET") {
            res.json({
                error: '-1',
                descripcion: `ruta: '${req.path}' metodo: '${method}' NO autorizada`
            });
        }
    
        next();
    }
    
    productExist(req, res ,next) {
        const { id } = req.params;
    
        productsServices.productIDExist(id) ? next() : res.json({error : 'producto no encontrado'});
    }
}

module.exports = new Products();