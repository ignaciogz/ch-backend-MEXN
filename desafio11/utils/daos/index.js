const { config } = require('../../config');

// Los posibles STORAGE son -> Firebase ; FS ; MariaDB ; Memory ; MongoDB ; SQLite3
const ChatDao = require(`./chat/ChatDao${config.SELECTED_CHAT_STORAGE}`);
const ProductsDao = require(`./products/ProductsDao${config.SELECTED_GENERAL_STORAGE}`);

module.exports = {
    chatDao: new ChatDao(),
    productsDao: new ProductsDao()
};