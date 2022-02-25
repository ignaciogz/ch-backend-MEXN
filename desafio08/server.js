const { config, db } = require("./config");
const Contenedor = require('./clases/Contenedor');
const ContenedorDB = require('./clases/ContenedorDB');

const express = require("express");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const moment = require("moment");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static('views'));

let arrayProductos = [];
let arrayMsjs = [];

/* FileSystem */
//const productos = new Contenedor("productos.txt");
//const mensajes = new Contenedor("mensajes.txt");

/* DB */
const productos = new ContenedorDB(db.mariaDB, "productos");
const mensajes = new ContenedorDB(db.sqlite3, "mensajes");

inicializarArrayProductos();
inicializarArrayMsjs();

inicializarDBs();

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

io.on('connection', socket => {
    console.log('Usuario conectado: ', socket.id);

    let existenProductos = arrayProductos.length > 0;
    let existenMsjs = arrayMsjs.length > 0;

    socket.emit('init', {arrayProductos, existenProductos, arrayMsjs, existenMsjs});

    socket.on("new-product", data => {
        const productoNuevo = data;
        const resultado = productos.save(data);

        resultado.then(data => {
            arrayProductos.push(productoNuevo);

            if(!existenProductos) {
                existenProductos = true;
                io.sockets.emit('renderView', {arrayProductos, existenProductos, arrayMsjs, existenMsjs});
            } else {
                io.sockets.emit('renderNewProduct', {arrayProductos});
            }
        });
    });

    socket.on("new-message", data => {
        data.date = moment().format("DD-MM-YYYY HH:mm:ss");

        const mensajeNuevo = data;
        const resultado = mensajes.save(data);

        resultado.then(data => {
            arrayMsjs.push(mensajeNuevo);

            if(!existenMsjs) {
                existenMsjs = true;
                io.sockets.emit('renderView', {arrayProductos, existenProductos, arrayMsjs, existenMsjs});
            } else {
                io.sockets.emit('renderNewMessage', {arrayMsjs});
            }
        });
    });
});

function inicializarArrayProductos() {
    const resultado = productos.getAll();
    resultado.then(data => {
        arrayProductos = data;
    });
}

function inicializarArrayMsjs() {
    const resultado = mensajes.getAll();
    resultado.then(data => {
        arrayMsjs = data;
    });
}

function inicializarDBs() {
    (async () => {
        try {
            let existeTabla = await productos.client.schema.hasTable(productos.table);
            if(!existeTabla){
                await productos.client.schema.createTable(productos.table, table =>{
                    table.increments("id").primary(),
                    table.string("title"),
                    table.float("price"),
                    table.string("thumbnail")
                });
            }else{
                console.log(`La tabla: ${productos.table}. Ya existe`);
            }        
        } catch (error) {
            console.log(error);
        }
    })();
    
    (async () => {
        try {
            let existeTabla = await mensajes.client.schema.hasTable(mensajes.table);
            if(!existeTabla){
                await mensajes.client.schema.createTable(mensajes.table, table =>{
                    table.increments("id").primary(),
                    table.string("email"),
                    table.string("date"),
                    table.string("msj")
                });
            }else{
                console.log(`La tabla: ${mensajes.table}. Ya existe`);
            }        
        } catch (error) {
            console.log(error);
        }
    })();
}

const server = httpServer.listen(config.PORT, () => {
    console.log(`Server on http://localhost:${config.PORT}`);
})

server.on("error", error => console.log(error));