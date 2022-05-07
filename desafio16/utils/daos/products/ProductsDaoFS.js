const FSContainer = require('../../containers/FSContainer');

class ProductsDaoFS extends FSContainer {
    constructor() {
        super("data/products.txt");
    }

    async desconectar() {

    }
}

module.exports = ProductsDaoFS;