const { args, config, DB } = require("./config");
const { mongoose } = require('./config/mongoDB');

const Koa = require("koa");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const koabody = require("koa-body");
const serve = require('koa-static');
const serverMw = require('./utils/middlewares/serverMiddleware');

// ↓ ****** SESIONES ****** ↓
const session = require("koa-session");
const MongooseStore = require("koa-session-mongoose");

// ↓ ****** PASSPORT-FACEBOOK ****** ↓
const { passportFacebook } = require("./utils/passport/facebook");

// ↓ ****** ARQUITECTURA EN CAPAS ****** ↓
let generalRouterKOA = require('./routes/generalRoutesKOA');
let productRouterKOA = require('./routes/productRoutesKOA');
let userRouterKOA = require('./routes/userRoutesKOA');
let facebookRouterKOA = require('./routes/facebookRoutesKOA');

// ↓ ****** SOCKETS ****** ↓
const appSocket = require('./utils/sockets/appSocket');

// ↓ ****** CLUSTERS Y ESCALABILIDAD ****** ↓
const cluster = require('cluster');
const CPUS = require('os').cpus();

class ServerKOA {
    constructor() {
        this.app = new Koa();
        this.httpServer = new HttpServer(this.app.callback());
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
        this.app.use(koabody());
        this.app.keys = [config.SESSION_SECRET];

        this.app.use(serve('src/public'));
        this.app.use(serve('src/views'));
    }

    views() {
    }

    middleware() {
        // ↓ ****** INICIO - SESIONES ****** ↓
        this.app.use(session({
            maxAge: 600000,
            httpOnly: false,
            rolling: true,
            secure: false,
            store: new MongooseStore()
        }, this.app));
        // ↑ ****** FIN - SESIONES ****** ↑

        // ↓ ****** INICIO - PASSPORT-FACEBOOK ****** ↓
        this.app.use(passportFacebook.initialize());
        this.app.use(passportFacebook.session());
        // ↑ ****** FIN - PASSPORT-FACEBOOK ****** ↑
    }

    routes() {
        this.app.use(generalRouterKOA.routes());
        this.app.use(productRouterKOA.routes());
        this.app.use(facebookRouterKOA.routes());
        this.app.use(userRouterKOA.routes());
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
                console.log(`KOA Server on http://localhost:${server.address().port} || Worker: ${process.pid} || Date: ${new Date()}`);
            })
            
            server.on("error", error => console.log(error));
        }
    }
}

module.exports = new ServerKOA();