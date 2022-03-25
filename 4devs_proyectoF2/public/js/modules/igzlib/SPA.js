import { App } from '../igzlib.js';

import { ControladorFrontal } from '../controladores/ControladorFrontal.js';

class SPA extends App {
    static inicializar() {
        if (SPA.instancia instanceof SPA) {
            return SPA.instancia;
        }

        return SPA.instancia = new SPA();
    }

    static #parsearPagina(url) {
        let paginaActual = url.hash.slice(1).toLowerCase() || '/';
        return paginaActual;
    }

    static ejecutar() {
        const app = SPA.inicializar();
        ControladorFrontal.ejecutar(app);
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

export { SPA };