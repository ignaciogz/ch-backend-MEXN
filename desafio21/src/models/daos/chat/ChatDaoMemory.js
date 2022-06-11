const MemoryContainer = require('../../containers/MemoryContainer');

const ChatDto = require('../../dtos/ChatDto');

class ChatDaoMemory extends MemoryContainer {
    constructor() {
        super();
    }

    async getByID(id) {
        try {
            const result = await super.getByID(id);

            return new ChatDto(result);
        } catch (error) {
            console.log("Error getById() on CartsDaoMemory", error);
        }
    }

    async getAll() {
        try {
            const results = await super.getAll();

            const dtos = results.map(result => {
                return new ChatDto(result);
            });

            return dtos;
        } catch (error) {
            console.log("Error getAll() on CartsDaoMemory", error);
        }
    }

    async desconectar() {

    }
}

module.exports = ChatDaoMemory;