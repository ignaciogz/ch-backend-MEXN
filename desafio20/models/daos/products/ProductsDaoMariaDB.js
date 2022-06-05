const RelationalDBContainer = require('../../containers/RelationalDBContainer');
const productsSchema = require('../../schemas/sql/products');
const { DB } = require('../../../config');

const ProductDto = require('../../dtos/ProductDto');

class ProductsDaoMariaDB extends RelationalDBContainer {
    constructor() {
        super("products", DB.mariaDB, productsSchema);
    }

    async getByID(id) {
        try {
            const result = await super.getByID(id);

            return new ProductDto(result);
        } catch (error) {
            console.log("Error getById() on ProductsDaoMariaDB", error);
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
            console.log("Error getAll() on ProductsDaoMariaDB", error);
        }
    }

    async desconectar() {

    }
}

module.exports = ProductsDaoMariaDB;