class Ruteador {
    static rutas = {
        "/": "IndexController",
        "addproduct": "AddProductController",
        "cart": "CartController"
    };

    static existe(pagina) {
        const existeRuta = Ruteador.rutas.hasOwnProperty(pagina);

        return existeRuta;
    }

    static getControlador(pagina) {
        return Ruteador.rutas[pagina];
    }
}

export { Ruteador };
