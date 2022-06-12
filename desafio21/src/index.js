const { args, config, DB } = require("./config");

const express = require("express");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const serverMw = require('./utils/middlewares/serverMiddleware');

// ↓ ****** CORS ****** ↓
let cors = require("cors");

// ↓ ****** GZIP ****** ↓
let responseTime = require("response-time");
const gzip = require("compression");

// ↓ ****** SESIONES ****** ↓
const cookieParser = require("cookie-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo');

// ↓ ****** PASSPORT-FACEBOOK ****** ↓
const { passportFacebook } = require("./utils/passport/facebook");

// ↓ ****** ARQUITECTURA EN CAPAS ****** ↓
const facebookRouter = require('./routes/facebookRoutes');
const fakerRouter = require('./routes/fakerRoutes');
const forkRouter = require('./routes/forkRoutes');
const generalRouter = require('./routes/generalRoutes');
const processRouter = require('./routes/processRoutes');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

// ↓ ****** SOCKETS ****** ↓
const appSocket = require('./utils/sockets/appSocket');

// ↓ ****** CLUSTERS Y ESCALABILIDAD ****** ↓
const cluster = require('cluster');
const CPUS = require('os').cpus();

class Server {
    constructor() {
        this.app = express();
        this.httpServer = new HttpServer(this.app);
        this.io = new IOServer(this.httpServer);
        this.port = args.PORT;
        this.mode = args.MODE;
        
        this.settings();
        this.middleware();
        this.routes();
        this.sockets();
        this.middlewareError();

    }

    settings() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.static("./src/public"));
        this.app.use(express.static("./src/views"));
    }

    views() {
    }

    middleware() {
        this.app.use(cors('*'));

        // ↓ ****** INICIO - GZIP ****** ↓
        this.app.use(responseTime());
        this.app.use(gzip({
            threshold: 0
        }));
        // ↑ ****** FIN - GZIP ****** ↑

        // ↓ ****** INICIO - SESIONES ****** ↓
        this.app.use(cookieParser());
        this.app.use(session({
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
        this.app.use(passportFacebook.initialize());
        this.app.use(passportFacebook.session());
        // ↑ ****** FIN - PASSPORT-FACEBOOK ****** ↑
    }

    routes() {
        this.app.use('/', generalRouter);
        this.app.use('/api/productos', productRouter);
        this.app.use('/api/usuario', userRouter);
        this.app.use('/auth/facebook', facebookRouter);
        this.app.use('/faker', fakerRouter);
        this.app.use('/fork', forkRouter);
        this.app.use('/process', processRouter);
    }

    middlewareError() {
        this.app.use(serverMw.routeNotImplemented);
    }

    sockets() {
        appSocket(this.io);
    }

    init() {
        if(this.mode === "CLUSTER" && cluster.isMaster) {
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
            const server = this.httpServer.listen(this.port, () => {
                console.log(`Server on http://localhost:${this.port} || Worker: ${process.pid} || Date: ${new Date()}`);
            })
            
            server.on("error", error => console.log(error));
        }
    }
}

module.exports = new Server();