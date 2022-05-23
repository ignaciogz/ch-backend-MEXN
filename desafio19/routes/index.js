const path = require('path');

const facebookRoutes = require('./facebookRoutes');
const fakerRoutes = require('./fakerRoutes');
const generalRoutes = require('./generalRoutes');

const forkRoutes = require('./forkRoutes');
const processRoutes = require('./processRoutes');

const authMw = require("../utils/middlewares/authMiddleware");
const { infoLog: loggerWinston } = require("../utils/loggers/winston");

module.exports = app => {
    app.all('*', (req, res, next) => {
        loggerWinston.info(`Petición recibida -> ruta: '${req.path}' || método: '${req.method}'`)
        next();
    });

    generalRoutes(app);
    facebookRoutes(app);
    fakerRoutes(app);
    
    // Rutas del Desafio 14:
    processRoutes(app);
    forkRoutes(app);

    app.get('/', authMw.isAuth, (req, res) => {
        res.sendFile('main.html', { root: path.resolve('public') });
    });
}