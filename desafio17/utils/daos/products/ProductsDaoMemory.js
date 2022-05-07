const MemoryContainer = require('../../containers/MemoryContainer');

class ProductsDaoMemory extends MemoryContainer {
    constructor() {
        super();
    }

    async desconectar() {

    }
}

module.exports = ProductsDaoMemory;