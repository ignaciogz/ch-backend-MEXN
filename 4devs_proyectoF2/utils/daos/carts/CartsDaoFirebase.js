const FirebaseContainer = require('../../containers/FirebaseContainer');

class CartsDaoFirebase extends FirebaseContainer {
    constructor() {
        super('carts');
    }

    async desconectar() {

    }
}

module.exports = CartsDaoFirebase;