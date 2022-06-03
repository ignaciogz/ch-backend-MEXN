const FirebaseContainer = require('../../containers/FirebaseContainer');

const ChatDto = require('../../dtos/ChatDto');

class ChatDaoFirebase extends FirebaseContainer {
    constructor() {
        super("chat");
    }

    async desconectar() {

    }
}

module.exports = ChatDaoFirebase;