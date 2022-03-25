const productsAPI = require('../components/products');
const cartAPI = require('../components/cart');

module.exports = app => {
    // Aqui invoco componentes
    productsAPI(app);
    cartAPI(app);

    // Aqui defino la ruta base
    app.get('/', (req, res) => {
        res.sendFile('index.html', { root: __dirname });
    });
}