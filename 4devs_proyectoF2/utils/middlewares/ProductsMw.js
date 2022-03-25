const { administrator } = require('../constants');

class ProductsMw {
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
}

module.exports = new ProductsMw();