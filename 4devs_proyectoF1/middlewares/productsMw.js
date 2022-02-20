// VARIABLES Globales ↓
const global = require('../config/globalVariables');

const productManager = global.productManager;
const ADMINISTRATOR_LEVEL = global.administrator;
// VARIABLES Globales ↑

module.exports.access = (req, res ,next) => {
    const method = req.method;

    if(!ADMINISTRATOR_LEVEL && method != "GET") {
        res.json({
            error: '-1',
            descripcion: `ruta: '${req.path}' metodo: '${method}' NO autorizada`
        });
    }

    next();
}

module.exports.productExist = (req, res ,next) => {
    const { id } = req.params;

    productManager.productIDExist(id) ? next() : res.json({error : 'producto no encontrado'});
}