const Contenedor = require('./clases/Contenedor');

const express = require("express");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const moment = require("moment");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static('views'));

let arrayProductos = [];
let arrayMsjs = [];
const productos = new Contenedor("productos.txt");
const mensajes = new Contenedor("mensajes.txt");

inicializarArrayProductos();
//app.use(inicializarArrayProductos);
inicializarArrayMsjs();

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

// MIDDLEWARES Propios ↓
function inicializarArrayProductos(req, res ,next) {
    const resultado = productos.getAll();
    resultado.then(data => {
        arrayProductos = data;
        //next();
    });
}

function inicializarArrayMsjs(req, res ,next) {
    const resultado = mensajes.getAll();
    resultado.then(data => {
        arrayMsjs = data;
        //next();
    });
}
// MIDDLEWARES Propios ↑


const server = httpServer.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`);
})

server.on("error", error => console.log(error));