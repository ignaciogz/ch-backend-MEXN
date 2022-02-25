const knex = require("knex");

class ContenedorDB {
    constructor(config, table) {
        this.client = knex(config);
        this.table = table;
    }

    async save(objeto) {
        try {
            const resultado = await this.client.from(this.table).insert(objeto, 'id');

            return resultado.shift();
        } catch (error) {
            console.log("Error en save() ", error);
        }
    }

    async getById(id) {
        try {
            const resultado = await this.client.from(this.table).where("id", id).limit(1);

            return resultado.length > 0 ? resultado.shift() : null;   
        } catch (error) {
            console.log("Error en getById() ", error);
        }
    }

    async getAll() {
        try {
            const resultado = await this.client.from(this.table);

            return resultado;
        } catch (error) {
            console.log("Error en getAll() ", error);
        }
    }

    async deleteById(id) {
        try {
            await this.client.from(this.table).where("id", id).del();
        } catch (error) {
            console.log("Error en deleteById() ", error);
        }
        
    }

    async deleteAll() {
        try {
            await this.client.from(this.table).del();
        } catch (error) {
            console.log("Error en deleteAll() ", error);
        }
    }
}

module.exports = ContenedorDB;