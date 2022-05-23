const RelationalDBContainer = require('../../containers/RelationalDBContainer');
const ChatSchema = require('../../schemas/sql/products');
const { DB } = require('../../../config');

class ChatDaoSQLite3 extends RelationalDBContainer {
    constructor() {
        super("chat", DB.sqlite3, ChatSchema);
    }

    #toJSON(data) {
        return JSON.stringify(data, null, 2);
    }

    async getByID(id) {
        try {
            const result = await super.getByID(id);
            
            const finalResult = {
                ...result,
                autor: JSON.parse(result.autor)
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
                    autor: JSON.parse(element.autor)
                }
            });

            return finalResult;
        } catch (error) {
            console.log("Error getAll() on CartsDaoMariaDB", error);
        }
    }

    async save(data) {
        try {
            data.autor = this.#toJSON(data.autor);
            return await super.save(data);
        } catch (error) {
            console.log("Error save() on CartsDaoMariaDB", error);
        }
    }

    async update(id, data) {
        try {
            data.autor = this.#toJSON(data.autor);
            await super.update(id, data);
        } catch (error) {
            console.log("Error update() on CartsDaoMariaDB", error);
        }
    }

    async desconectar() {

    }
}

module.exports = ChatDaoSQLite3;