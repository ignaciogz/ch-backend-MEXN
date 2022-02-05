const fs = require('fs');

class Contenedor {
    constructor(nombreDeArchivo) {
        this.nombreDeArchivo = nombreDeArchivo;
        this.#init();
    }

    #createContent(listado, ultimoID) {
        return this.#toJSON({
            listado,
            ultimoID
        });
    }

    #initialContent() {
        return this.#createContent(new Array(), 0);
    }

    #toJSON(data) {
        return JSON.stringify(data, null, 2);
    }

    #init() {
        if (!fs.existsSync(this.nombreDeArchivo)) {
            const contenidoJSON = this.#initialContent();
            fs.writeFileSync(this.nombreDeArchivo, contenidoJSON, 'utf-8');

            this.ultimoID = 0;
        } else {
            let contenido = fs.readFileSync(this.nombreDeArchivo, 'utf-8');
            contenido = JSON.parse(contenido);

            this.ultimoID = contenido.ultimoID;
        }
    }

    async save(objeto, idExistente = null) {
        try {
            let listado = await this.getAll();
            
            if(idExistente) {
                objeto.id = idExistente;
            } else {
                // Agrego un ID nuevo al objeto a guardar
                objeto.id = ++this.ultimoID;
            }
            
            listado.push(objeto);

            const contenidoJSON = this.#createContent(listado, this.ultimoID);
            await fs.promises.writeFile(this.nombreDeArchivo, contenidoJSON);

            return objeto.id;
        } catch (error) {
            console.log("Error en save() ", error);
        }
    }

    async getById(id) {
        try {
            const listado = await this.getAll();
            const indice = listado.findIndex(elemento => elemento.id == id);

            return (indice != -1) ? listado[indice] : null;   
        } catch (error) {
            console.log("Error en getById() ", error);
        }
    }

    async getAll() {
        try {
            let contenido = await fs.promises.readFile(this.nombreDeArchivo, 'utf-8');
            contenido = JSON.parse(contenido);

            return contenido.listado;
        } catch (error) {
            console.log("Error en getAll() ", error);
        }
    }

    async deleteById(id) {
        try {
            let listado = await this.getAll();
            const indice = listado.findIndex(elemento => elemento.id == id);

            if (indice != -1) {
                // Elimino el objeto solicitado
                listado.splice(indice, 1);

                const contenidoJSON = this.#createContent(listado, this.ultimoID);
                await fs.promises.writeFile(this.nombreDeArchivo, contenidoJSON);
            }
        } catch (error) {
            console.log("Error en deleteById() ", error);
        }
        
    }

    async deleteAll() {
        try {
            const contenidoJSON = this.#initialContent();
            await fs.promises.writeFile(this.nombreDeArchivo, contenidoJSON);   
        } catch (error) {
            console.log("Error en deleteAll() ", error);
        }
    }
}

module.exports = Contenedor;