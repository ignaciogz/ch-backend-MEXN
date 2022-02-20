const ArrayTools = require('../utils/ArrayTools');
const Container = require('../utils/Container');
const TimeTools = require('../utils/TimeTools');

class Cart {
    constructor() {
        this.list = [];
        this.storage = new Container("cart.txt");
        this.#initList();
    }

    #initList() {
        const result = this.storage.getAll();
        result.then(data => {
            this.list = data;
        });
    }

    #createCart() {
        return {
            timestamp: TimeTools.getTimestamp(),
            productos: []
        }
    }

    async create() {
        const newCart = this.#createCart();
        const id = await this.storage.save(newCart);

        this.list.push(newCart);
        return id;
    }

    getID(id) {
        return this.list.filter(element => element.id == id).shift();
    }

    add(id, product) {
        const cart = this.getID(id);
        cart.productos.push(product);

        this.#update(id, cart);
    }

    delete(id) {
        const index = ArrayTools.getIndexByID(this.list, id);

        this.storage.deleteById(id);
        this.list.splice(index, 1);
    }

    deleteProduct(id, id_prod) {
        const cart = this.getID(id);
        
        const index = ArrayTools.getIndexByID(cart.productos, id_prod);
        cart.productos.splice(index, 1);
        
        this.#update(id, cart);
    }

    async #update(id, modifiedCart) {
        const index = ArrayTools.getIndexByID(this.list, id);

        await this.storage.deleteById(id);
        
        this.storage.save(modifiedCart, id);
        this.list.splice(index, 1, modifiedCart);
    }
}

module.exports = Cart;