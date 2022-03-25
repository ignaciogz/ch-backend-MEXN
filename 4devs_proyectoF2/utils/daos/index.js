const { config } = require('../../config');

// Los posibles SELECTED_STORAGE son -> Firebase ; FS ; MariaDB ; Memory ; MongoDB ; SQLite3
const CartsDao = require(`./carts/CartsDao${config.SELECTED_STORAGE}`);
const ProductsDao = require(`./products/ProductsDao${config.SELECTED_STORAGE}`);

/* VERSION MODULOS ES6:

    let CartsDao = await import(`./carts/CartsDao${config.selectedStorage}.js`);
    CartsDao = new CartsDao();

    let ProductsDao = await import(`./products/ProductsDao${config.selectedStorage}.js`);
    ProductsDao = new ProductsDao();

    export * from "./index.js";
*/

module.exports = {
    cartsDao: new CartsDao(),
    productsDao: new ProductsDao()
};