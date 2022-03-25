const { firestore } = require('../firebase');
const { ArrayTools, TimeTools } = require('../tools');

class FirebaseContainer {
    constructor(collectionName) {
        this.collection = firestore.collection(collectionName);

        this.#init();
    }

    async #init() {
        this.lastID = await this.getAll().then(content => {
            console.log(content);
            const elementsQty = content.length;

            if (elementsQty > 0) {
                const lastElement = content[elementsQty-1];
                return lastElement.id;
            }

            return 0; 
        });
    }

    #getNewID() {
        return ++this.lastID;
    }

    async getByID(id) {
        try {
            const result = await this.collection.doc(`${id}`).get();
            return result.data();
        } catch (error) {
            console.log("Error getById() ", error);
        }
    }

    async getAll() {
        try {
            const response = await this.collection.get();
            const docs = response.docs;
            const result = docs.map(doc => doc.data());

            return result;
        } catch (error) {
            console.log("Error getAll() ", error);
        }
    }

    async save(data) {
        try {
            data.id = this.#getNewID();
            data.timestamp = TimeTools.getTimestamp();

            await this.collection.doc(`${data.id}`).create(data);

            return data.id;
        } catch (error) {
            console.log("Error save() ", error);
        }
    }

    async update(id, data) {
        try {
            data.id = parseInt(id);
            data.timestamp = TimeTools.getTimestamp();

            await this.collection.doc(`${id}`).update(data);
        } catch (error) {
            console.log("Error update() ", error);
        }
    }

    async deleteById(id) {
        try {
            await this.collection.doc(`${id}`).delete();
        } catch (error) {
            console.log("Error deleteById() ", error);
        }
    }

    async deleteAll() {
        try {
            await this.collection.doc().delete();
            this.lastID = 0;
        } catch (error) {
            console.log("Error deleteAll() ", error);
        }
    }

    async elementExist(id) {
        try {
            const elements = await this.getAll();
            
            const index = ArrayTools.getIndexOfElementID(elements, id);
            return (index !== -1);
        } catch (error) {
            console.log("Error elementExist() ", error);
        }
    }
}

module.exports = FirebaseContainer;