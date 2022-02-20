// RUTAS de la app ↓
const productsRouter = require('./routes/productsRouter');
const cartRouter = require('./routes/cartRouter');
// RUTAS de la app ↑

// MIDDLEWARES Propios ↓
const serverMw = require('./middlewares/serverMw');
// MIDDLEWARES Propios ↑

const express = require("express");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static('views'));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartRouter);

app.use(serverMw.routeNotImplemented);

const server = app.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`);
})

server.on("error", error => console.log(error));