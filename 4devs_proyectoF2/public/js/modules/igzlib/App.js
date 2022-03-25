import { Ruteador } from '../igzlib.js';

class App {
    ejecutarControlador(controlador) {
        import(`../controladores/${controlador}.js`)
        .then(module => module.controlador.ejecutar());
    }
    
	existe(pagina) {
        return Ruteador.existe(pagina);
    }
    
    getControlador(pagina) {
        return Ruteador.getControlador(pagina)
    }
}

export { App };