const knex = require("knex");
const { ArrayTools, TimeTools } = require('../../utils/tools');

class RelationalDBContainer {
    constructor(table, config, schema) {
        this.table = table;
        this.client = knex(config);
        this.schema = schema;

        this.#init();
    }

    async #init() {
        try {
            const tableExist = await this.client.schema.hasTable(this.table);
            if(!tableExist) {
                await this.client.schema.createTable(this.table, table => this.schema(table));
            } else {
                console.log(`Table "${this.table}" already exist !`);
            }
        } catch (error) {
            console.log("Error #init() on RelationalDBContainer", error);
        }
    }

    async getByID(id) {
        try {
            const result = await this.client.from(this.table).where("id", id).limit(1);
            return result.shift();   
        } catch (error) {
            console.log("Error getById() ", error);
        }
    }

    async getAll() {
        try {
            const result = await this.client.from(this.table);
            return result;
        } catch (error) {
            console.log("Error getAll() ", error);
        }
    }

    async save(data) {
        try {
            data.timestamp = TimeTools.getTimestamp();

            const insertID = await this.client.from(this.table).insert(data, 'id');

            return insertID.shift();
        } catch (error) {
            console.log("Error save() ", error);
        }
    }

    async update(id, data) {
        try {
            data.id = parseInt(id);
            data.timestamp = TimeTools.getTimestamp();
            
            await this.client.from(this.table).where("id", id).update(data);
        } catch (error) {
            console.log("Error update() ", error);
        }
    }

    async deleteById(id) {
        try {
            await this.client.from(this.table).where("id", id).del();
        } catch (error) {
            console.log("Error deleteById() ", error);
        }
        
    }

    async deleteAll() {
        try {
            await this.client.from(this.table).del();
        } catch (error) {
            console.log("Error deleteAll() ", error);
        }
    }

    async elementExist(id) {
        try {
            const elements = await this.getAll();
            
            const index = ArrayTools.getIndexOfElementID(elements, id);
            return (index !== -1);
        } catch (error) {
            console.log("Error elementExist() ", error);
        }
    }
}

module.exports = RelationalDBContainer;