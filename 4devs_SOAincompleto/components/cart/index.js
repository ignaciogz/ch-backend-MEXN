const express = require('express');
const cartController = require('./controllers/cartController');

module.exports = app => {
    const router = express.Router();
    app.use('/api/carrito', router);

    // Aqui cargo los middlewares de rutas
    router.get('/:id/productos', cartController.getID);
    
    router.post('/', cartController.create);
    
    router.post('/:id/productos', cartController.add);
    
    router.delete('/:id', cartController.delete);
    
    router.delete('/:id/productos/:id_prod', cartController.deleteProduct);
}