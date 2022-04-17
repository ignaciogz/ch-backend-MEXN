const path = require('path');

const facebookRoutes = require('./facebookRoutes');
const fakerRoutes = require('./fakerRoutes');
const generalRoutes = require('./generalRoutes');

const forkRoutes = require('./forkRoutes');
const processRoutes = require('./processRoutes');

const authMw = require("../utils/middlewares/Auth");

module.exports = app => {
    generalRoutes(app)
    facebookRoutes(app);
    fakerRoutes(app);
    
    // Rutas del Desafio 14:
    processRoutes(app);
    forkRoutes(app);

    app.get('/', authMw.isAuth, (req, res) => {
        res.sendFile('main.html', { root: path.resolve('public') });
    });
}