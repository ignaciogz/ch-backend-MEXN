const { chatDao } = require('../models/daos');
const ChatDto = require('../models/dtos/ChatDto');
const Chat = require('../services/chat');

class ChatRepo {
    async getAll() {
        const dtos = await chatDao.getAll();
        return dtos.map(dto => new Chat(dto));
    }
    
    async save(data) {
        const dto = new ChatDto(data);
        return chatDao.save(dto);
    } 
}

module.exports = new ChatRepo();