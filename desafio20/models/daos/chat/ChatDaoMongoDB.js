const MongoDBContainer = require('../../containers/MongoDBContainer');
const chatSchema = require('../../schemas/nosql/chat');

const ChatDto = require('../../dtos/ChatDto');

class ChatDaoMongoDB extends MongoDBContainer {
    constructor() {
        super("chat", chatSchema);
    }

    async desconectar() {

    }
}

module.exports = ChatDaoMongoDB;