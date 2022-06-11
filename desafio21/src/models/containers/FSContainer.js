const fs = require('fs');
const { ArrayTools, TimeTools } = require('../../utils/tools');

class FSContainer {
    constructor(fileName) {
        this.fileName = fileName;
        
        this.#init();
    }

    async #init() {
        if (!fs.existsSync(this.fileName)) {
            this.lastID = 0;
            const contentJSON = this.#initialContent();
            fs.writeFileSync(this.fileName, contentJSON, 'utf-8');
        } else {
            this.lastID = await this.getAll().then(content => {
                const elementsQty = content.length;
    
                if (elementsQty > 0) {
                    const lastElement = content[elementsQty-1];
                    return lastElement.id;
                }
    
                return 0; 
            });
        }
    }

    #createContent(elements) {
        return this.#toJSON({
            elements
        });
    }

    #initialContent() {
        return this.#createContent(new Array());
    }

    #getNewID() {
        return ++this.lastID;
    }

    #toJSON(data) {
        return JSON.stringify(data, null, 2);
    }

    async getByID(id) {
        try {
            const elements = await this.getAll();

            const index = ArrayTools.getIndexOfElementID(elements, id);
            return elements[index];
        } catch (error) {
            console.log("Error getById() ", error);
        }
    }

    async getAll() {
        try {
            let content = await fs.promises.readFile(this.fileName, 'utf-8');
            content = JSON.parse(content);

            return content.elements;
        } catch (error) {
            console.log("Error getAll() ", error);
        }
    }

    async save(data) {
        try {
            data.id = this.#getNewID();
            data.timestamp = TimeTools.getTimestamp();

            const elements = await this.getAll();
            elements.push(data);

            const contentJSON = this.#createContent(elements, data.id);
            await fs.promises.writeFile(this.fileName, contentJSON);

            return data.id;
        } catch (error) {
            console.log("Error save() ", error);
        }
    }

    async update(id, data) {
        try {
            data.id = parseInt(id);
            data.timestamp = TimeTools.getTimestamp();
            
            const elements = await this.getAll();
            const index = ArrayTools.getIndexOfElementID(elements, id);
            elements.splice(index, 1, data);

            const contentJSON = this.#createContent(elements, id);
            await fs.promises.writeFile(this.fileName, contentJSON);
        } catch (error) {
            console.log("Error update() ", error);
        }
    }

    async deleteById(id) {
        try {
            const elements = await this.getAll();
            const index = ArrayTools.getIndexOfElementID(elements, id);

            elements.splice(index, 1);

            const contentJSON = this.#createContent(elements);
            await fs.promises.writeFile(this.fileName, contentJSON);
        } catch (error) {
            console.log("Error deleteById() ", error);
        }
        
    }

    async deleteAll() {
        try {
            const contentJSON = this.#initialContent();
            await fs.promises.writeFile(this.fileName, contentJSON);
            this.lastID = 0;
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

module.exports = FSContainer;