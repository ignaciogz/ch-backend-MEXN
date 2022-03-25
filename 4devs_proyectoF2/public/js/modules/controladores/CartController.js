import { Request, SPA, View } from '../igzlib.js';
import { Global } from '../utils.js';

class CartController {
    static async ejecutar() {
        const HBSTemplate = await View.getHBS("cart");

        const dataCart = await Request.GET(`/api/carrito/${Global.cartId}/productos`);

        const viewData = Object.assign(dataCart);
                    
        View.renderView(HBSTemplate, viewData);

        CartController.addEventHandlers();
    }

    static addEventHandlers() {
        const deleteAllCartBtn = document.getElementById("deleteAllCartBtn");
        deleteAllCartBtn.addEventListener("click", function (e) {
            e.preventDefault();

            const res = Request.DELETE(`/api/carrito/${Global.cartId}`);
            res.then(result => {
                const dataCreatedCart = Request.POST("/api/carrito");
                dataCreatedCart.then(data => {
                    Global.cartId = data.id;
                    SPA.ejecutar();
                });
            });
        });

        const deleteProdCartBtns = document.getElementsByClassName("deleteProdCartBtn");
        for (const deleteProdCartBtn of deleteProdCartBtns) {
            deleteProdCartBtn.addEventListener("click", function (e) {
                e.preventDefault();

                const id_prod = parseInt(this.dataset.id_prod);

                const res = Request.DELETE(`/api/carrito/${Global.cartId}/productos/${id_prod}`);
                res.then(data => {
                    SPA.ejecutar();
                });
            });
        }
    }
}

export { CartController as controlador };