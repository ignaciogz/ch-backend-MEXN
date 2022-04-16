const { config, DB } = require("./config");

let faker = require("faker");

const { chatSchema } = require("./utils/schemas/normalize/chat");
const { NormalizeTools } = require("./utils/tools");
const { productsDao, chatDao } = require('./utils/daos');

const express = require("express");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const MongoStore = require('connect-mongo');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static('views'));

const EXPRESS_SECRET = "SUPER SECRET SHHHHHH";

app.use(cookieParser());
app.use(session({
    cookie: { maxAge: 600000 },
    resave: false,
    rolling: true,
    saveUninitialized: false,
    secret: EXPRESS_SECRET,
    store: MongoStore.create({ 
        mongoUrl: DB.mongoDB.atlas_uri,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    })
}));

// ↓↓↓↓ INICIO - PASSPORT-FACEBOOK ↓↓↓↓
const passport = require("passport");
const facebookStrategy = require('passport-facebook').Strategy;
const FACEBOOK_APP_ID = '533238238171976';
const FACEBOOK_SECRET_KEY = 'f1dec2ad97af11a2f83ba72286697030';

passport.use(new facebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_SECRET_KEY,
    callbackURL: '/auth/facebook/callback',
    profileFields: ["id", "displayName", "photos", "emails"],
    scope: ["email"]
}, (accessToken, refreshSecret, profile, done)=>{
    const facebookUser = {
        userName: profile.displayName,
        userImg: profile.photos[0].value,
        userEmail: profile.emails[0].value
    }

    done(null, facebookUser);
}));

passport.serializeUser(function (user, cb) {
	cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
	cb(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', {
        successRedirect:'/',
        failureRedirect: '/registro'
    })
);

let isAuth = (req, res, next) =>{
    if(req.isAuthenticated()){
       return next();
    }
    res.redirect('/login');
}

let isNotAuth = (req, res, next) =>{
    if(!req.isAuthenticated()){
        next();
    }else{        
        res.redirect('/');
    }
}

app.get('/registro', isNotAuth, (req, res, next)=>{
    res.sendFile('register.html', { root: __dirname + "/public" });
});
app.post('/registro', passport.authenticate('register', {failureRedirect: 'registro-error', successRedirect:'/'}));

app.get('/', isAuth, (req, res) => {
    res.sendFile('main.html', { root: __dirname + "/public" });
});

app.get('/login', isNotAuth, (req, res) => {
    res.sendFile('login.html', { root: __dirname + "/public" });
});
app.post('/login', passport.authenticate('login', {failureRedirect: 'login-error', successRedirect:'/'}));

app.get('/api/usuario', (req, res) => {
    res.json({ ...req.user });
});

app.get("/login-error", (req, res) => {
	res.sendFile('login-error.html', { root: __dirname + "/public" });
});

app.get("/registro-error", (req, res) => {
	res.sendFile('registro-error.html', { root: __dirname + "/public" });
});

app.get('/logout', (req, res) => {
    res.sendFile('logout.html', { root: __dirname + "/public" });
});

app.delete('/logout', (req, res) => {
    req.session.destroy( err => {
        if(err) {
            res.send({ status: "Logout ERROR", body: err });
        } else {
            res.send("Logout OK !");
        }
    });
});
// ↓↓↓↓ FIN - PASSPORT-FACEBOOK ↓↓↓↓

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