const Router = require('koa-router');

const controller = require('../controllers/product');

const productRouter = new Router({
    prefix: "/api/productos"
});

productRouter.get('/', controller.getProducts);
productRouter.post('/', controller.postProduct);
productRouter.put('/', controller.putProduct);
productRouter.delete('/', controller.deleteProduct);

module.exports = productRouter;