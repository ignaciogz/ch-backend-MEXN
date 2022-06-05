const RelationalDBContainer = require('../../containers/RelationalDBContainer');
const ChatSchema = require('../../schemas/sql/products');
const { DB } = require('../../../config');

const ChatDto = require('../../dtos/ChatDto');

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
            
            let dto = new ChatDto(result);
            dto.autor = JSON.parse(dto.autor);
            
            return dto;
        } catch (error) {
            console.log("Error getById() on ChatDaoSQLite3", error);
        }
    }

    async getAll() {
        try {
            const results = await super.getAll();

            const dtos = results.map(result => {
                let dto = new ChatDto(result);
                dto.autor = JSON.parse(dto.autor);
                
                return dto;
            });

            return dtos;
        } catch (error) {
            console.log("Error getAll() on ChatDaoSQLite3", error);
        }
    }

    async save(data) {
        try {
            data.autor = this.#toJSON(data.autor);
            return await super.save(data);
        } catch (error) {
            console.log("Error save() on ChatDaoSQLite3", error);
        }
    }

    async update(id, data) {
        try {
            data.autor = this.#toJSON(data.autor);
            await super.update(id, data);
        } catch (error) {
            console.log("Error update() on ChatDaoSQLite3", error);
        }
    }

    async desconectar() {

    }
}

module.exports = ChatDaoSQLite3;