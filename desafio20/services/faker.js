let faker = require("faker");

const generarProductosAleatorios = () => {
    try {
        faker.locale = "es";
        const arrayProductosAleatorios = [];     

        for (let i = 0; i < 5; i++) {
            const producto = {
                title: faker.commerce.product(),
                price: faker.commerce.price(),
                thumbnail: faker.image.abstract(640, 480, true)
            }    
            arrayProductosAleatorios.push(producto);
        }

        return arrayProductosAleatorios;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { generarProductosAleatorios }