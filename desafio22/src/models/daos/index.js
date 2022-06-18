const { config } = require('../../config');

// Los posibles STORAGE son -> Firebase ; FS ; MariaDB ; Memory ; MongoDB ; SQLite3
const ChatDao = require(`./chat/ChatDao${config.SELECTED_STORAGE}`);
const ProductsDao = require(`./products/ProductsDao${config.SELECTED_STORAGE}`);

// Por patrón Factory: Crea y devuelve un set de DAOs.
// Por patrón Singleton: Será único.
class DAOsFactory {
    static singleton;

    constructor() {
        if(DAOsFactory.singleton){
            return DAOsFactory.singleton;
        }
        
        DAOsFactory.singleton = {
            chatDao: new ChatDao(),
            productsDao: new ProductsDao()
        };

        this.singleton = DAOsFactory.singleton;
    }
}

module.exports = new DAOsFactory().singleton;