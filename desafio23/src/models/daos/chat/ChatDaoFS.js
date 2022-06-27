const FSContainer = require('../../containers/FSContainer');

const ChatDto = require('../../dtos/ChatDto');

class ChatDaoFS extends FSContainer {
    constructor() {
        super("src/data/chat.txt");
    }

    async getByID(id) {
        try {
            const result = await super.getByID(id);

            return new ChatDto(result);
        } catch (error) {
            console.log("Error getById() on CartsDaoFS", error);
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
            console.log("Error getAll() on CartsDaoFS", error);
        }
    }

    async desconectar() {

    }
}

module.exports = ChatDaoFS;