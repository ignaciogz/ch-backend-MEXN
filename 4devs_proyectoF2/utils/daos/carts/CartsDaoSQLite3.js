const RelationalDBContainer = require('../../containers/RelationalDBContainer');
const cartsSchema = require('../../schemas/sql/carts');
const { DB } = require('../../../config');

class CartsDaoSQLite3 extends RelationalDBContainer {
    constructor() {
        super("carts", DB.sqlite3, cartsSchema);
    }

    #toJSON(data) {
        return JSON.stringify(data, null, 2);
    }

    async getByID(id) {
        try {
            const result = await super.getByID(id);
            
            const finalResult = {
                ...result,
                items: JSON.parse(result.items)
            }

            return finalResult;
        } catch (error) {
            console.log("Error getById() on CartsDaoMariaDB", error);
        }
    }

    async getAll() {
        try {
            const result = await super.getAll();

            const finalResult = result.map(element => {
                return {
                    ...element,
                    items: JSON.parse(element.items)
                }
            });

            return finalResult;
        } catch (error) {
            console.log("Error getAll() on CartsDaoMariaDB", error);
        }
    }

    async save(data) {
        try {
            data.items = this.#toJSON(data.items);
            return await super.save(data);
        } catch (error) {
            console.log("Error save() on CartsDaoMariaDB", error);
        }
    }

    async update(id, data) {
        try {
            data.items = this.#toJSON(data.items);
            await super.update(id, data);
        } catch (error) {
            console.log("Error update() on CartsDaoMariaDB", error);
        }
    }

    async desconectar() {

    }
}

module.exports = CartsDaoSQLite3;