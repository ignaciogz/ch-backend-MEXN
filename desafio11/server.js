const { config } = require("./config");

// Consigna 1
let faker = require("faker");

// Consigna 2
const { chatSchema } = require("./utils/schemas/normalize/chat");
const { NormalizeTools } = require("./utils/tools");
const { productsDao, chatDao } = require('./utils/daos');

const express = require("express");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static('views'));

// Consigna 1
app.get('/productos-test', (req, res) => {
    res.sendFile('faker.html', { root: __dirname+"/public" });
});

app.get('/api/productos-test', (req, res) => {
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

        res.json({ arrayProductosAleatorios });
    } catch (error) {
        console.log(error);
    }
});

// Consigna 2
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

io.on('connection', async socket => {
    let arrayProductos = await productsDao.getAll();
    let arrayMsjs = await chatDao.getAll();

    let existenProductos = arrayProductos.length > 0;
    let existenMsjs = arrayMsjs.length > 0;
    
    console.log('Usuario conectado: ', socket.id);

        arrayMsjs = NormalizeTools.getNormalizeData(arrayMsjs, chatSchema, "mensajes");

    socket.emit('init', { arrayProductos, existenProductos, arrayMsjs, existenMsjs });

    socket.on("new-product", async productoNuevo => {
        await productsDao.save(productoNuevo);
        arrayProductos = await productsDao.getAll();

        if (!existenProductos) {
            existenProductos = true;
            io.sockets.emit('renderView', { arrayProductos, existenProductos, arrayMsjs, existenMsjs });
        } else {
            io.sockets.emit('renderNewProduct', { arrayProductos });
        }
    });

    socket.on("new-message", async mensajeNuevo => {
        await chatDao.save(mensajeNuevo);
        arrayMsjs = await chatDao.getAll();

        arrayMsjs = NormalizeTools.getNormalizeData(arrayMsjs, chatSchema, "mensajes");

        if(!existenMsjs) {
            existenMsjs = true;
            io.sockets.emit('renderView', { arrayProductos, existenProductos, arrayMsjs, existenMsjs });
        } else {
            io.sockets.emit('renderNewMessage', { arrayMsjs });
        }
    });
});

const server = httpServer.listen(config.PORT, () => {
    console.log(`Server on http://localhost:${config.PORT}`);
})

server.on("error", error => console.log(error));