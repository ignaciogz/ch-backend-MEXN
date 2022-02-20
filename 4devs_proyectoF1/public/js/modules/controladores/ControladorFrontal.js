import { Navegador } from '../igzlib.js';

class ControladorFrontal {
    static ejecutar(instanciaApp) {
        const pagina = Navegador.paginaActual();

        if (instanciaApp.existe(pagina)) {
            const controlador = instanciaApp.getControlador(pagina);
            instanciaApp.ejecutarControlador(controlador);
        }
    }
}

export { ControladorFrontal };