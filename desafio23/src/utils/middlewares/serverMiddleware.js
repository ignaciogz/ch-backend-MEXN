const { warnLog: loggerWinston } = require("../loggers/winston");

class Server {
    routeNotImplemented(req, res, next) {
        loggerWinston.warn(`Ruta inexistente -> ruta: '${req.path}' || método: '${req.method}'`);
    }
}

module.exports = new Server();