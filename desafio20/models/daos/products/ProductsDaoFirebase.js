const FirebaseContainer = require('../../containers/FirebaseContainer');

const ProductDto = require('../../dtos/ProductDto');

class ProductsDaoFirebase extends FirebaseContainer {
    constructor() {
        super("products");
    }

    async getByID(id) {
        try {
            const result = await super.getByID(id);

            return new ProductDto(result);
        } catch (error) {
            console.log("Error getById() on ProductsDaoFirebase", error);
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
            console.log("Error getAll() on ProductsDaoFirebase", error);
        }
    }

    async desconectar() {

    }
}

module.exports = ProductsDaoFirebase;