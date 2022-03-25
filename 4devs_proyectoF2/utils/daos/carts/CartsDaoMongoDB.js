const MongoDBContainer = require('../../containers/MongoDBContainer');
const cartsSchema = require('../../schemas/nosql/carts');

class CartsDaoMongoDB extends MongoDBContainer {
    constructor() {
        super('carts', cartsSchema);
    }

    async desconectar() {

    }
}

module.exports = CartsDaoMongoDB;