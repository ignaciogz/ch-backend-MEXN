const { mongoose } = require('../../config/mongoDB');
const { ArrayTools, TimeTools } = require('../tools');

class MongoDBContainer {
    constructor(modelName, schema) {
        const schemaModel = new mongoose.Schema(schema);
        this.model = new mongoose.model(modelName, schemaModel);

        this.#init();
    }

    async #init() {
        this.lastID = await this.getAll().then(content => {
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
            const result = await this.model.find({id}).limit(1);
            return result.shift();
        } catch (error) {
            console.log("Error getById() ", error);
        }
    }

    async getAll() {
        try {
            const result = await this.model.find({});
            return result;
        } catch (error) {
            console.log("Error getAll() ", error);
        }
    }

    async save(data) {
        try {
            data.id = this.#getNewID();
            data.timestamp = TimeTools.getTimestamp();

            await this.model.create(data);

            return data.id;
        } catch (error) {
            console.log("Error save() ", error);
        }
    }

    async update(id, data) {
        try {
            data.id = parseInt(id);
            data.timestamp = TimeTools.getTimestamp();

            await this.model.updateOne({id}, data);
        } catch (error) {
            console.log("Error update() ", error);
        }
    }

    async deleteById(id) {
        try {
            await this.model.deleteMany({id});
        } catch (error) {
            console.log("Error deleteById() ", error);
        }
    }

    async deleteAll() {
        try {
            await this.model.deleteMany({});
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

module.exports = MongoDBContainer;