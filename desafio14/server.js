const { args, config, DB } = require("./config");
const { passportFacebook } = require("./config/passportAuth");

const { chatSchema } = require("./utils/schemas/normalize/chat");
const { NormalizeTools } = require("./utils/tools");
const { productsDao, chatDao } = require('./utils/daos');

const express = require("express");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const serverRoutes = require('./routes');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const MongoStore = require('connect-mongo');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static('views'));

// ↓ ****** INICIO - SESIONES ****** ↓
app.use(cookieParser());
app.use(session({
    cookie: { maxAge: 600000 },
    resave: false,
    rolling: true,
    saveUninitialized: false,
    secret: config.SESSION_SECRET,
    store: MongoStore.create({ 
        mongoUrl: DB.mongoDB.atlas_uri,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    })
}));
// ↑ ****** FIN - SESIONES ****** ↑

// ↓ ****** INICIO - PASSPORT-FACEBOOK ****** ↓
app.use(passportFacebook.initialize());
app.use(passportFacebook.session());

serverRoutes(app);

// ↓ ****** INICIO - SOCKETS ****** ↓
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
// ↑ ****** FIN - SOCKETS ****** ↑

const server = httpServer.listen(args.PORT, () => {
    console.log(`Server on http://localhost:${args.PORT}`);
})

server.on("error", error => console.log(error));