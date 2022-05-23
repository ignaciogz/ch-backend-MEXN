const { args, config, DB } = require("./config");
const { errorLog: loggerWinston } = require("./utils/loggers/winston");

const express = require("express");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const serverRoutes = require('./routes');
const serverMw = require('./utils/middlewares/serverMiddleware');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static('views'));

// ↓ ****** INICIO - GZIP ****** ↓
let responseTime = require("response-time");
app.use(responseTime());

const gzip = require("compression");
app.use(gzip({
    threshold: 0
}));
// ↑ ****** FIN - GZIP ****** ↑

// ↓ ****** INICIO - SESIONES ****** ↓
const cookieParser = require("cookie-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo');

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
const { passportFacebook } = require("./utils/passport/facebook");

app.use(passportFacebook.initialize());
app.use(passportFacebook.session());
// ↑ ****** FIN - PASSPORT-FACEBOOK ****** ↑

serverRoutes(app);

app.use(serverMw.routeNotImplemented);

// ↓ ****** INICIO - SOCKETS ****** ↓
const { chatSchema } = require("./models/schemas/normalize/chat");
const { productsDao, chatDao } = require('./models/daos');
const { NormalizeTools } = require("./utils/tools");

io.on('connection', async socket => {
    let arrayProductos = await productsDao.getAll();
    let arrayMsjs = await chatDao.getAll();

    let existenProductos = arrayProductos.length > 0;
    let existenMsjs = arrayMsjs.length > 0;
    
    console.log('Usuario conectado: ', socket.id);

        arrayMsjs = NormalizeTools.getNormalizeData(arrayMsjs, chatSchema, "mensajes");

    socket.emit('init', { arrayProductos, existenProductos, arrayMsjs, existenMsjs });

    // ↓ ****** INICIO - SOCKET: Producto ****** ↓
    socket.on("new-product", async productoNuevo => {
        try {
            await productsDao.save(productoNuevo);
            arrayProductos = await productsDao.getAll();
    
            if (!existenProductos) {
                existenProductos = true;
                io.sockets.emit('renderView', { arrayProductos, existenProductos, arrayMsjs, existenMsjs });
            } else {
                io.sockets.emit('renderNewProduct', { arrayProductos });
            }
        } catch (error) {
            loggerWinston.error(`API Productos -> Error: ${error.message}`)
        }
    });
    // ↑ ****** FIN - SOCKET: Producto ****** ↑

    // ↓ ****** INICIO - SOCKET: Mensaje ****** ↓
    socket.on("new-message", async mensajeNuevo => {
        try {
            await chatDao.save(mensajeNuevo);
            arrayMsjs = await chatDao.getAll();
    
            arrayMsjs = NormalizeTools.getNormalizeData(arrayMsjs, chatSchema, "mensajes");
    
            if(!existenMsjs) {
                existenMsjs = true;
                io.sockets.emit('renderView', { arrayProductos, existenProductos, arrayMsjs, existenMsjs });
            } else {
                io.sockets.emit('renderNewMessage', { arrayMsjs });
            }   
        } catch (error) {
            loggerWinston.error(`API Mensajes -> Error: ${error.message}`)
        }
    });
    // ↑ ****** FIN - SOCKET: Mensaje ****** ↑
});
// ↑ ****** FIN - SOCKETS ****** ↑

// ↓ ****** INICIO - Clusters y Escalabilidad ****** ↓
const cluster = require('cluster');
const CPUS = require('os').cpus();

if(args.MODE === "CLUSTER" && cluster.isMaster) {
    console.log(`Master PID -> ${process.pid}`)

    // WORKERS
    for (let index = 0; index < CPUS.length; index++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`El subproceso ${worker.process.pid} ha MUERTO !`)
        cluster.fork()
    })
} else {
    const server = httpServer.listen(args.PORT, () => {
        console.log(`Server on http://localhost:${args.PORT} || Worker: ${process.pid} || Date: ${new Date()}`);
    })
    
    server.on("error", error => console.log(error));
}
// ↑ ****** FIN - Clusters y Escalabilidad ****** ↑