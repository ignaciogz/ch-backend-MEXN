const { args, config, DB } = require("./config");

const express = require("express");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
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

// ↓ ****** INICIO - ARQUITECTURA EN CAPAS ****** ↓
const facebookRouter = require('./routes/facebookRoutes');
const fakerRouter = require('./routes/fakerRoutes');
const forkRouter = require('./routes/forkRoutes');
const generalRouter = require('./routes/generalRoutes');
const processRouter = require('./routes/processRoutes');
const userRouter = require('./routes/userRoutes');

app.use('/', generalRouter);
app.use('/api/usuario', userRouter);
app.use('/auth/facebook', facebookRouter);
app.use('/faker', fakerRouter);
app.use('/fork', forkRouter);
app.use('/process', processRouter);
// ↑ ****** FIN - ARQUITECTURA EN CAPAS ****** ↑

app.use(serverMw.routeNotImplemented);

// ↓ ****** INICIO - SOCKETS ****** ↓
const appSockets = require('./services/socket');
appSockets(io);
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