const RelationalDBContainer = require('../../containers/RelationalDBContainer');
const productsSchema = require('../../schemas/sql/products');
const { DB } = require('../../../config');

class ProductsDaoSQLite3 extends RelationalDBContainer {
    constructor() {
        super("products", DB.sqlite3, productsSchema);
    }

    async desconectar() {

    }
}

module.exports = ProductsDaoSQLite3;