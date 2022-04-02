const FirebaseContainer = require('../../containers/FirebaseContainer');

class ChatDaoFirebase extends FirebaseContainer {
    constructor() {
        super("chat");
    }

    async desconectar() {

    }
}

module.exports = ChatDaoFirebase;