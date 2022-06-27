let axios = require("axios");

class ProductAxios {
    constructor() {
        this.url = "http://localhost:8080/api/productos";
    }

    async getProducts() {
        try {
            const response = await axios.get(this.url);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async postProduct(data) {
        try {
            const response = await axios.post(this.url, data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async putProduct(data) {
        try {
            const response = await axios.put(this.url, data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(data) {
        try {
            const response = await axios.delete(this.url, {data: data});
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ProductAxios();