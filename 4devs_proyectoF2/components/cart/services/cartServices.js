const { cartsDao } = require('../../../utils/daos');
const { ArrayTools, TimeTools } = require('../../../utils/tools');

class Cart {
    constructor() {
        this.storage = cartsDao;
    }

    async #initCart() {
        return {
            items: []
        }
    }

    async create() {
        const newCart = await this.#initCart();

        const cartID = await this.storage.save(newCart);
        return cartID;
    }

    async getID(id) {
        const cart = await this.storage.getByID(id);
        return cart;
    }

    async add(id, item) {
        const cart = await this.getID(id);
        
        item.timestamp = TimeTools.getTimestamp();
        cart.items.push(item);

        await this.#update(id, cart);
    }

    async delete(id) {
        await this.storage.deleteById(id);
    }

    async deleteProduct(id, id_prod) {
        const cart = await this.getID(id);
        
        const itemIndex = ArrayTools.getIndexOfElementID(cart.items, id_prod);
        cart.items.splice(itemIndex, 1);
        
        await this.#update(id, cart);
    }

    async #update(id, modifiedCart) {
        await this.storage.update(id, modifiedCart);
    }
}

module.exports = new Cart();