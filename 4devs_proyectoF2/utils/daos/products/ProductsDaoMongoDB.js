const MongoDBContainer = require('../../containers/MongoDBContainer');
const productsSchema = require('../../schemas/nosql/products');

class ProductsDaoMongoDB extends MongoDBContainer {
    constructor() {
        super('products', productsSchema);
    }

    async desconectar() {

    }
}

module.exports = ProductsDaoMongoDB;