const { warnLog: loggerWinston } = require("../loggers/winston");

class ServerMw {
    routeNotImplemented(req, res, next) {
        loggerWinston.warn(`Ruta inexistente -> ruta: '${req.path}' || método: '${req.method}'`);
    }
}

module.exports = new ServerMw();