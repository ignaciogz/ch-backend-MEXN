import { SPA } from './modules/igzlib.js';
import { Global } from './modules/utils.js';

window.onload = async () => {
    await Global.init();

    SPA.ejecutar();

    window.onhashchange = SPA.ejecutar;
};