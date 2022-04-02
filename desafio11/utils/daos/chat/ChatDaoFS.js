const FSContainer = require('../../containers/FSContainer');

class ChatDaoFS extends FSContainer {
    constructor() {
        super("data/chat.txt");
    }

    async desconectar() {

    }
}

module.exports = ChatDaoFS;