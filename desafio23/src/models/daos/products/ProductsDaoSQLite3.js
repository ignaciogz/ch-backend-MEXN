const RelationalDBContainer = require('../../containers/RelationalDBContainer');
const productsSchema = require('../../schemas/sql/products');
const { DB } = require('../../../config');

const ProductDto = require('../../dtos/ProductDto');

class ProductsDaoSQLite3 extends RelationalDBContainer {
    constructor() {
        super("products", DB.sqlite3, productsSchema);
    }

    async getByID(id) {
        try {
            const result = await super.getByID(id);

            return new ProductDto(result);
        } catch (error) {
            console.log("Error getById() on ProductsDaoSQLite3", error);
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
            console.log("Error getAll() on ProductsDaoSQLite3", error);
        }
    }

    async desconectar() {

    }
}

module.exports = ProductsDaoSQLite3;