const FSContainer = require('../../containers/FSContainer');

class CartsDaoFS extends FSContainer {
    constructor() {
        super("data/carts.txt");
    }

    async desconectar() {

    }
}

module.exports = CartsDaoFS;