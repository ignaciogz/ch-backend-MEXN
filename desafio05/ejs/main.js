const Contenedor = require('./clases/Contenedor');

const express = require("express");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.set("view engine", "ejs");
app.set("views", "./views");

let arrayProductos = [];
const productos = new Contenedor("productos.txt");

app.use(inicializarArrayProductos);

app.get('/', (req, res) => {
    res.render("index", {});
})

app.get('/productos', (req, res) => {
    res.render("productos", {arrayProductos, existenProductos: arrayProductos.length > 0});
})

app.post('/productos', (req, res) => {
    const productoNuevo = req.body;

    const resultado = productos.save(productoNuevo);
    resultado.then(data => {
        arrayProductos.push(productoNuevo);
        res.redirect("/productos");
    });
})

// MIDDLEWARES Propios ↓
function inicializarArrayProductos(req, res ,next) {
    const resultado = productos.getAll();
    resultado.then(data => {
        arrayProductos = data;
        next();
    });
}
// MIDDLEWARES Propios ↑


const server = app.listen(PORT, () => {
    console.log(`Server on http://localhost:${PORT}`);
})

server.on("error", error => console.log(error));