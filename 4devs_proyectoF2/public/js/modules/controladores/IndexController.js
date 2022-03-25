import { FormTools, Request, SPA, View } from '../igzlib.js';
import { Global } from '../utils.js';

class IndexController {
    static async ejecutar() {
        const HBSTemplate = await View.getHBS("index");
                    
        const dataProducts = await Request.GET("/api/productos");
        const dataCart = await Request.GET(`/api/carrito/${Global.cartId}/productos`);

        const viewData = Object.assign(dataProducts, dataCart);
        
        View.renderView(HBSTemplate, viewData);

        IndexController.addEventHandlers();
    }

    static addEventHandlers() {
        const addBtns = document.getElementsByClassName("addBtn");
        for (const addBtn of addBtns) {
            addBtn.addEventListener("click", function (e) {
                e.preventDefault();

                const id_prod = parseInt(this.dataset.id_prod);
                const data = {
                    id_prod
                };

                const res = Request.POST(`/api/carrito/${Global.cartId}/productos`, data);
                res.then(data => {
                    SPA.ejecutar();
                });
            });
        }

        const editBtns = document.getElementsByClassName("editBtn");
        for (const editBtn of editBtns) {
            editBtn.addEventListener("click", function (e) {
                e.preventDefault();

                const id_prod = parseInt(this.dataset.id_prod);

                const modalTitle = document.getElementById("modalEditLabel");
                modalTitle.innerHTML = `Edit product ${id_prod}`;
                modalTitle.dataset.id_prod = id_prod;

                const res = Request.GET(`/api/productos/${id_prod}`);
                res.then(data => {
                    const { product } = data;

                    FormTools.setInput("nombre", product.nombre);
                    FormTools.setInput("precio", product.precio);
                    FormTools.setInput("foto", product.foto);
                    FormTools.setInput("codigo", product.codigo);
                    FormTools.setInput("stock", product.stock);
                    FormTools.setInput("descripcion", product.descripcion);
                });
            });
        }

        const deleteBtns = document.getElementsByClassName("deleteBtn");
        for (const deleteBtn of deleteBtns) {
            deleteBtn.addEventListener("click", function (e) {
                e.preventDefault();

                const id_prod = parseInt(this.dataset.id_prod);

                const res = Request.DELETE(`/api/productos/${id_prod}`);
                res.then(data => {
                    SPA.ejecutar();
                });
            });
        }

        const formEditProduct = document.getElementById('formEditProduct');
        formEditProduct.addEventListener("submit", e => {
            e.preventDefault();

            const $myModal = document.getElementById('modalEdit');
            const myModal = bootstrap.Modal.getInstance($myModal);

            const modalTitle = document.getElementById("modalEditLabel");
            const id_prod = parseInt(modalTitle.dataset.id_prod);

            const data = {
                nombre: FormTools.getInput("nombre"),
                precio: parseFloat(FormTools.getInput("precio")),
                foto: FormTools.getInput("foto"),
                stock: parseInt(FormTools.getInput("stock")),
                codigo: FormTools.getInput("codigo"),
                descripcion: FormTools.getInput("descripcion")
            }

            const res = Request.PUT(`/api/productos/${id_prod}`, data);
            res.then(data => {
                myModal.hide();
                SPA.ejecutar();
            });

            return false;
        });
    }
}

export { IndexController as controlador };