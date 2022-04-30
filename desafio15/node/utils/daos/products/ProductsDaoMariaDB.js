const RelationalDBContainer = require('../../containers/RelationalDBContainer');
const productsSchema = require('../../schemas/sql/products');
const { DB } = require('../../../config');

class ProductsDaoMariaDB extends RelationalDBContainer {
    constructor() {
        super("products", DB.mariaDB, productsSchema);
    }

    async desconectar() {

    }
}

module.exports = ProductsDaoMariaDB;