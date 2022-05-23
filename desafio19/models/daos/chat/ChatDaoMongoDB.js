const MongoDBContainer = require('../../containers/MongoDBContainer');
const chatSchema = require('../../schemas/nosql/products');

class ChatDaoMongoDB extends MongoDBContainer {
    constructor() {
        super("chat", chatSchema);
    }

    async desconectar() {

    }
}

module.exports = ChatDaoMongoDB;