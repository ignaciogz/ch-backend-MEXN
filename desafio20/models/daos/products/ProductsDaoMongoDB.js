const MongoDBContainer = require('../../containers/MongoDBContainer');
const productsSchema = require('../../schemas/nosql/products');

const ProductDto = require('../../dtos/ProductDto');

class ProductsDaoMongoDB extends MongoDBContainer {
    constructor() {
        super("products", productsSchema);
    }

    async getByID(id) {
        try {
            const result = await super.getByID(id);

            return new ProductDto(result);
        } catch (error) {
            console.log("Error getById() on ProductsDaoMongoDB", error);
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
            console.log("Error getAll() on ProductsDaoMongoDB", error);
        }
    }

    async desconectar() {

    }
}

module.exports = ProductsDaoMongoDB;