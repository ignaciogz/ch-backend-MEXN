// NO PUEDO USAR property getters and setters, porque estos encapsulan usando propiedades privadas (LO DEJO COMENTADO)
// Yo debo enviar al frontend las propiedades de cada instancia !

class Chat {
    /* #autor;
    #id;
    #msj;
    #timestamp; */

    constructor({ autor, id, msj, timestamp }) {
        // Reemplazo los property getters and setters por metodos privados de validacion:
        this.#validar(autor, id, msj, timestamp);

        this.autor = autor;
        this.id = id;
        this.msj = msj;
        this.timestamp = timestamp;
    }

    #validar(autor, id, msj, timestamp) {
        this.#validarAutor(autor);
        this.#validarID(id);
        this.#validarMsj(msj);
        this.#validarTimestamp(timestamp);
    }

    #validarAutor(autor) {
        if (!autor) throw new Error('"autor" es un campo requerido');
    }

    #validarID(id) {
        if (!id) throw new Error('"id" es un campo requerido');
    }

    #validarMsj(msj) {
        if (!msj) throw new Error('"msj" es un campo requerido');
    }

    #validarTimestamp(timestamp) {
        if (!timestamp) throw new Error('"timestamp" es un campo requerido');
    }

    /* get id() {
        return this.#id;
    }

    set id(id) {
        if (!id) throw new Error('"id" es un campo requerido');
        this.#id = id;
    }

    get autor() {
        return this.#autor;
    }

    set autor(autor) {
        if (!autor) throw new Error('"autor" es un campo requerido');
        this.#autor = autor;
    }

    get msj() {
        return this.#msj;
    }

    set msj(msj) {
        if (!msj) throw new Error('"msj" es un campo requerido');
        this.#msj = msj;
    }

    get timestamp() {
        return this.#timestamp;
    }

    set timestamp(timestamp) {
        if (!timestamp) throw new Error('"timestamp" es un campo requerido');
        this.#timestamp = timestamp;
    } */
}

module.exports = Chat;