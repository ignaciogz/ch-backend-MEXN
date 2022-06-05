const FSContainer = require('../../containers/FSContainer');

const ProductDto = require('../../dtos/ProductDto');

class ProductsDaoFS extends FSContainer {
    constructor() {
        super("data/products.txt");
    }

    async getByID(id) {
        try {
            const result = await super.getByID(id);

            return new ProductDto(result);
        } catch (error) {
            console.log("Error getById() on ProductsDaoFS", error);
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
            console.log("Error getAll() on ProductsDaoFS", error);
        }
    }

    async desconectar() {

    }
}

module.exports = ProductsDaoFS;