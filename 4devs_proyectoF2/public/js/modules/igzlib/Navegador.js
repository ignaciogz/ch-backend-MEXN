class Navegador {
    static paginaActual() {
        let url = document.createElement('a');
        url.href = location.href;

        return url;
    }
}

export { Navegador };