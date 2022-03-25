const { productsDao } = require('../../../utils/daos');

class Products {
    constructor() {
        this.storage = productsDao;
    }

    async getAll() {
        const products = await this.storage.getAll();
        return products;
    }

    async getID(id) {
        const product = await this.storage.getByID(id);
        return product;
    }

    async add(newProduct) {
        const productID = await this.storage.save(newProduct);
        return productID;
    }

    async update(id, modifiedProduct) {
        await this.storage.update(id, modifiedProduct);
    }

    async delete(id) {
        await this.storage.deleteById(id);
    }

    async productIDExist(id) {
        const exist = await this.storage.elementExist(id);
        return exist;
    }
}

module.exports = new Products();