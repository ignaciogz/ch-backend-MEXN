import { Request } from '../igzlib.js';

class Global {
    static async init() {
        const dataCreatedCart = await Request.POST("/api/carrito");
        Global.cartId = dataCreatedCart.id;
    }
}

export { Global };