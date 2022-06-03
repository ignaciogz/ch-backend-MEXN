const MemoryContainer = require('../../containers/MemoryContainer');

const ChatDto = require('../../dtos/ChatDto');

class ChatDaoMemory extends MemoryContainer {
    constructor() {
        super();
    }

    async desconectar() {

    }
}

module.exports = ChatDaoMemory;