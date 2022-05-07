const { config } = require('../../config');

// Los posibles STORAGE son -> Firebase ; FS ; MariaDB ; Memory ; MongoDB ; SQLite3
const ChatDao = require(`./chat/ChatDao${config.CHAT_STORAGE}`);
const ProductsDao = require(`./products/ProductsDao${config.GENERAL_STORAGE}`);

module.exports = {
    chatDao: new ChatDao(),
    productsDao: new ProductsDao()
};