const productAxios = require("./ProductAxios");
const separator = `\n${"*".repeat(35)}\n`;

const getProducts = async () => {
    const getData = await productAxios.getProducts();
    console.log(`${separator}HTTP-CLIENT -> Method: GET ${separator}`, getData);
}

const postProduct = async () => {
    const postData = await productAxios.postProduct({
        title: "Producto agregador por http client",
        price: 999.88,
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
    });
    console.log(`${separator}HTTP-CLIENT -> Method: POST ${separator}`, postData);
}

const putProduct = async () => {
    const putData = await productAxios.putProduct({
        id: 4,
        data: {
            "title": "Producto agregador por http client",
            "price": 111.22,
            "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
        }
    });
    console.log(`${separator}HTTP-CLIENT -> Method: PUT ${separator}`, putData);
}

const deleteProduct = async () => {
    const deleteData = await productAxios.deleteProduct({
        id: 4
    });
    console.log(`${separator}HTTP-CLIENT -> Method: DELETE ${separator}`, deleteData);
}

getProducts();
//postProduct();
//putProduct();
//deleteProduct();