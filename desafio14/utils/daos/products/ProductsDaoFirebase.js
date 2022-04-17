const FirebaseContainer = require('../../containers/FirebaseContainer');

class ProductsDaoFirebase extends FirebaseContainer {
    constructor() {
        super("products");
    }

    async desconectar() {

    }
}

module.exports = ProductsDaoFirebase;