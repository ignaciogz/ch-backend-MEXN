const request = require('supertest')('http://localhost:8080/api/productos');
const expect = require('chai').expect;
const fs = require('fs');
const initialData = require('./data/initialData');

const fileName = "src/data/products.txt";

describe('TEST API', () => {
    before(() => {
        console.log('*********** START ***********\n');
        createProductsFile();
    });

    after(() => {
        /* if(fs.existsSync(fileName)) {
            fs.unlinkSync(fileName);
        }

        createProductsFile(); */
        console.log('\n*********** END ***********\n');
    });

    describe('GET products', () => {
        it('Deberia retornar un status code 200', async () => {
            let response = await request.get('/');
            expect(response.status).to.eql(200);
        });

        it('Deberia retornar en formato JSON', async () => {
            let response = await request.get('/');
            expect(response.headers["content-type"]).to.eql("application/json; charset=utf-8");
        });

        it('Deberia ser igual al contenido inicial', async () => {
            let response = await request.get('/');

            const initial = JSON.parse(initialData);
            for (let i = 0; i < initial.elements.length; i++) {
                expect(response.body[i]).to.include.keys("title", "id", "price", "timestamp", "thumbnail");
                
                expect(response.body[i].title).to.eql(initial.elements[i].title);
                expect(response.body[i].id).to.eql(initial.elements[i].id);
                expect(response.body[i].price).to.eql(initial.elements[i].price);
                expect(response.body[i].timestamp).to.eql(initial.elements[i].timestamp);
                expect(response.body[i].thumbnail).to.eql(initial.elements[i].thumbnail);
            }
        });
    });

    describe('POST product', () => {
        it('Deberia agregar un producto nuevo', async () => {
            const newProduct = {
                title: "Producto nuevo agregado",
                price: 999.88,
                thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
            }

            let response = await request.post('/').send(newProduct);

            expect(response.body).to.include.keys("title", "id", "price", "timestamp", "thumbnail");
                
            expect(response.body.title).to.eql(newProduct.title);
            expect(response.body.price).to.eql(newProduct.price);
            expect(response.body.thumbnail).to.eql(newProduct.thumbnail);
        });
    });

    describe('PUT product', () => {
        it('Deberia actualizar el producto con ID 1', async () => {
            const editProduct = {
                id: 1,
                data: {
                    "title": "Producto actualizado !",
                    "price": 111.22,
                    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
                }
            }

            let response = await request.put('/').send(editProduct);

            expect(response.body).to.include.keys("id", "data");
            expect(response.body.data).to.include.keys("title", "id", "price", "timestamp", "thumbnail");
                
            expect(response.body.id).to.eql(editProduct.id);
            expect(response.body.data.title).to.eql(editProduct.data.title);
            expect(response.body.data.price).to.eql(editProduct.data.price);
            expect(response.body.data.thumbnail).to.eql(editProduct.data.thumbnail);
        });
    });

    describe('DELETE product', () => {
        it('Deberia eliminar el producto con ID 2', async () => {
            const deleteProduct = {
                id: 2
            }

            let response = await request.del('/').send(deleteProduct);

            expect(response.body).to.include.keys("id");
            expect(response.body.id).to.eql(deleteProduct.id);
        });
    });
});


// FUNCIONES AUXILIARES
function createProductsFile() {
    fs.writeFileSync(fileName, initialData);
}