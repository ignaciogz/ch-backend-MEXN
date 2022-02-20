let cartId;

const executeSPA = () => {
    const app = new SPA();
    ControladorFrontal.ejecutar(app);
};

window.onload = async () => {
    const dataCreatedCart = await Request.POST("/api/carrito");
    cartId = dataCreatedCart.id;

    executeSPA();
};

window.onhashchange = executeSPA;

class Request {
    static #generateOptionsObj(method, data) {
        return {
            method,
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
    }

    static async #generateRequestWithOptions(url, method, data) {
        const options = Request.#generateOptionsObj(method, data);
        
        return await fetch(url, options)
                        .then(res => res.json());
    }

    static async GET(url) {
        return await fetch(url)
                        .then(res => res.json());
    }

    static async POST(url, data = {}) {
        return await Request.#generateRequestWithOptions(url, "POST", data);
    }

    static async PUT(url, data = {}) {
        return await Request.#generateRequestWithOptions(url, "PUT", data);
    }

    static async DELETE(url, data = {}) {
        return await Request.#generateRequestWithOptions(url, "DELETE", data);
    }
}

class View {
    static async getHBS(vista) {
        return await fetch(`/${vista}.handlebars`)
                        .then(res => res.text());
    }
    
    static renderView(HBSTemplate, data = null) {
        const template = Handlebars.compile(HBSTemplate);          // Compilando la plantilla
        const html = template(data);                               // Generando el html
        document.getElementById('container').innerHTML = html;     // Inyectando el resultado en la vista
    }
}

class Navegador {
    static paginaActual() {
        let url = document.createElement('a');
        url.href = location.href;

        return url;
    }
}

class ControladorFrontal {
    static ejecutar(instanciaApp) {
        const pagina = Navegador.paginaActual();

        if (instanciaApp.existe(pagina)) {
            const controlador = instanciaApp.getControlador(pagina);
            instanciaApp.ejecutarControlador(controlador);
        }
    }
}

class App {
    async ejecutarControlador(controlador) {
        let HBSTemplate, dataProducts;
        let viewData = {};

        // Modelos
        let dataCart = await Request.GET(`/api/carrito/${cartId}/productos`);

        switch (controlador) {
            case "IndexController":
                    HBSTemplate = await View.getHBS("index");
                    
                    dataProducts = await Request.GET("/api/productos");

                    viewData = Object.assign(dataProducts, dataCart);
                    
                    View.renderView(HBSTemplate, viewData);

                    const addBtns = document.getElementsByClassName("addBtn");
                    for (const addBtn of addBtns) {
                        addBtn.addEventListener("click", function(e){
                            e.preventDefault();

                            const id_prod = parseInt(this.dataset.id_prod);
                            const data = {id_prod};
                            
                            Request.POST(`/api/carrito/${cartId}/productos`, data);

                            executeSPA();
                        });
                    }

                    const editBtns = document.getElementsByClassName("editBtn");
                    for (const editBtn of editBtns) {
                        editBtn.addEventListener("click", function(e){
                            e.preventDefault();
                            
                            const id_prod = parseInt(this.dataset.id_prod);
                            
                            const modalTitle = document.getElementById("modalEditLabel");
                            modalTitle.innerHTML = `Edit product ${id_prod}`;
                            modalTitle.dataset.id_prod = id_prod;
                            
                            const result = Request.GET(`/api/productos/${id_prod}`);
                            result.then(data => {
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
                        deleteBtn.addEventListener("click", function(e){
                            e.preventDefault();

                            const id_prod = parseInt(this.dataset.id_prod);
                            
                            Request.DELETE(`/api/productos/${id_prod}`);

                            executeSPA();
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

                        const result = Request.PUT(`/api/productos/${id_prod}`, data);
                        result.then(data => {
                            myModal.hide();
                            executeSPA();
                        });

                        return false;
                    });
                break;
            case "AddProductController":
                    HBSTemplate = await View.getHBS("addproduct");

                    viewData = Object.assign(dataCart);
                    
                    View.renderView(HBSTemplate, viewData);

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
                break;
            case "CartController":
                    HBSTemplate = await View.getHBS("cart");

                    viewData = Object.assign(dataCart);
                    
                    View.renderView(HBSTemplate, viewData);
                    
                    const deleteAllCartBtn = document.getElementById("deleteAllCartBtn");
                    deleteAllCartBtn.addEventListener("click", function(e){
                        e.preventDefault();
                        
                        const result = Request.DELETE(`/api/carrito/${cartId}`);
                        
                        result.then(res => {
                            const dataCreatedCart =  Request.POST("/api/carrito");
                            dataCreatedCart.then(data => {
                                cartId = data.id;
                                executeSPA();
                            });
                        });
                        
                    });
                break;
        }
    }

	existe(pagina) {
        return Ruteador.existe(pagina);
    }
    
    getControlador(pagina) {
        return Ruteador.getControlador(pagina)
    }
}

class SPA extends App {
    static #parsearPagina(url) {
        let paginaActual = url.hash.slice(1).toLowerCase() || '/';
        return paginaActual;
    }

    existe(pagina) {
        pagina = SPA.#parsearPagina(pagina);
        return super.existe(pagina);
    }

    getControlador(pagina) {
        pagina = SPA.#parsearPagina(pagina);
        return super.getControlador(pagina);
    }
}

class Ruteador {
    static rutas = {
        "/":"IndexController",
        "addproduct":"AddProductController",
        "cart": "CartController"
    }

    static existe(pagina) {
        const existeRuta = Ruteador.rutas.hasOwnProperty(pagina);
        
        return existeRuta;
    }

    static getControlador(pagina) {
        return Ruteador.rutas[pagina];
    }
}
    
class FormTools {
    static getInput(id) {
        const $input = document.getElementById(`${id}`);

        return $input.value;
    }

    static setInput(id, valor) {
        const $input = document.getElementById(`${id}`);

        $input.value = valor;
    }
}