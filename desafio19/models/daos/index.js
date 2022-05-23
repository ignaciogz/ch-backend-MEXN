const { config } = require('../../config');

// Los posibles STORAGE son -> Firebase ; FS ; MariaDB ; Memory ; MongoDB ; SQLite3
const ChatDao = require(`./chat/ChatDao${config.CHAT_STORAGE}`);
const ProductsDao = require(`./products/ProductsDao${config.GENERAL_STORAGE}`);

const myDAO = {
    chatDao: new ChatDao(),
    productsDao: new ProductsDao()
};

class DAO {
    static singleton;

    constructor() {
        if(DAO.singleton){
            return DAO.singleton;
        }
        
        DAO.singleton = myDAO;
        this.singleton = DAO.singleton;
    }
}

module.exports = new DAO().singleton;