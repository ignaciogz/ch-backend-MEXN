const ArrayTools = require('../utils/ArrayTools');
const Container = require('../utils/Container');
const TimeTools = require('../utils/TimeTools');

class Product {
    constructor() {
        this.list = [];
        this.storage = new Container("products.txt");
        this.#initList();
    }

    #initList() {
        const result = this.storage.getAll();
        result.then(data => {
            this.list = data;
        });
    }

    getAll() {
        return this.list;
    }

    getID(id) {
        const index = ArrayTools.getIndexByID(this.list, id);
        return this.list[index];
    }

    async add(newProduct) {
        newProduct.timestamp = TimeTools.getTimestamp();
        await this.storage.save(newProduct);
        
        this.list.push(newProduct);
    }

    delete(id) {
        const index = ArrayTools.getIndexByID(this.list, id);

        this.storage.deleteById(id);
        this.list.splice(index, 1);
    }

    productIDExist(id) {
        const index = ArrayTools.getIndexByID(this.list, id);
        return (index != -1);
    }

    async update(id, modifiedProduct) {
        modifiedProduct.timestamp = TimeTools.getTimestamp();
        const index = ArrayTools.getIndexByID(this.list, id);

        await this.storage.deleteById(id);
        
        this.storage.save(modifiedProduct, id);
        this.list.splice(index, 1, modifiedProduct);
    }
}

module.exports = Product;