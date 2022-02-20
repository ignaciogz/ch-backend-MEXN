import { FormTools, Request, View } from '../igzlib.js';
import { Global } from '../utils.js';

class AddProductController {
    static async ejecutar() {
        const HBSTemplate = await View.getHBS("addproduct");

        const dataCart = await Request.GET(`/api/carrito/${Global.cartId}/productos`);

        const viewData = Object.assign(dataCart);
                    
        View.renderView(HBSTemplate, viewData);

        AddProductController.addEventHandlers();
    }

    static addEventHandlers() {
        const formProduct = document.getElementById('formProduct');
        formProduct.addEventListener("submit", e => {
            e.preventDefault();

            const data = {
                nombre: FormTools.getInput("nombre"),
                precio: parseFloat(FormTools.getInput("precio")),
                foto: FormTools.getInput("foto"),
                stock: parseInt(FormTools.getInput("stock")),
                codigo: FormTools.getInput("codigo"),
                descripcion: FormTools.getInput("descripcion")
            }

            const result = Request.POST(`/api/productos/`, data);
            result.then(data => {
                window.location.hash = "#";
            });

            return false;
        });
    }
}

export { AddProductController as controlador };