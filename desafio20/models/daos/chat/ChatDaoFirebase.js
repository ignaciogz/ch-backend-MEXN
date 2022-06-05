const FirebaseContainer = require('../../containers/FirebaseContainer');

const ChatDto = require('../../dtos/ChatDto');

class ChatDaoFirebase extends FirebaseContainer {
    constructor() {
        super("chat");
    }

    async getByID(id) {
        try {
            const result = await super.getByID(id);

            return new ChatDto(result);
        } catch (error) {
            console.log("Error getById() on CartsDaoFirebase", error);
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
            console.log("Error getAll() on CartsDaoFirebase", error);
        }
    }

    async desconectar() {

    }
}

module.exports = ChatDaoFirebase;