const MemoryContainer = require('../../containers/MemoryContainer');

const ProductDto = require('../../dtos/ProductDto');

class ProductsDaoMemory extends MemoryContainer {
    constructor() {
        super();
    }

    async getByID(id) {
        try {
            const result = await super.getByID(id);

            return new ProductDto(result);
        } catch (error) {
            console.log("Error getById() on ProductsDaoMemory", error);
        }
    }

    async getAll() {
        try {
            const results = await super.getAll();

            const dtos = results.map(result => {
                return new ProductDto(result);
            });

            return dtos;
        } catch (error) {
            console.log("Error getAll() on ProductsDaoMemory", error);
        }
    }

    async desconectar() {

    }
}

module.exports = ProductsDaoMemory;