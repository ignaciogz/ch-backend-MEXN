const { ArrayTools, TimeTools } = require('../tools');

class MemoryContainer {
    constructor() {
        this.lastID = 0;
        
        this.#init();
    }

    #init() {
        this.elements = [];
    }

    #getNewID() {
        return ++this.lastID;
    }

    getByID(id) {
        const index = ArrayTools.getIndexOfElementID(this.elements, id);
        return this.elements[index];
    }

    getAll() {
        return this.elements;
    }

    save(data) {
        data.id = this.#getNewID();
        data.timestamp = TimeTools.getTimestamp();
        
        this.elements.push(data);
        
        return data.id;
    }

    update(id, data) {
        data.id = parseInt(id);
        data.timestamp = TimeTools.getTimestamp();

        const index = ArrayTools.getIndexOfElementID(this.elements, id);
        this.elements.splice(index, 1, data);
    }  

    deleteById(id) {
        const index = ArrayTools.getIndexOfElementID(this.elements, id);
        this.elements.splice(index, 1);
    }

    deleteAll() {
        this.#init();
        this.lastID = 0;
    }
    
    elementExist(id) {
        const index = ArrayTools.getIndexOfElementID(this.elements, id);
        return (index !== -1);
    }
}

module.exports = MemoryContainer;