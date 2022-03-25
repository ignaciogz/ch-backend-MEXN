const MemoryContainer = require('../../containers/MemoryContainer');

class CartsDaoMemory extends MemoryContainer {
    constructor() {
        super();
    }

    async desconectar() {

    }
}

module.exports = CartsDaoMemory;