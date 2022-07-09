class Colores {
    constructor() {
        this.colores = [];
    }

    add(color) {
        this.colores.push(color);
    }

    getAll() {
        return this.colores;
    }
}

const coloresModel = new Colores()
export default coloresModel