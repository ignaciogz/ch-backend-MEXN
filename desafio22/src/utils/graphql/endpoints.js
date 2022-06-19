const service = require('../../services/product');

class Endpoints {
    getProducts = async () => {
        try {
            const products = await service.getAll();
            return products;
        } catch (error) {
            console.log(error);
        }
    };
    
    createProduct = async ({ data }) => {
        try {
            await service.save(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    
    updateProduct = async ({ id, data }) => {
        try {
            await service.update(id, data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    
    deleteProduct = async ({ id }) => {
        try {
            await service.deleteById(id);
            return id;
        } catch (error) {
            console.log(error);
        }
    };
}

module.exports = new Endpoints();