const { warnLog: loggerWinston } = require("../loggers/winston");

class Server {
    async routeNotImplemented(ctx, next) {
        loggerWinston.warn(`Ruta inexistente -> ruta: '${ctx.request.path}' || método: '${ctx.request.method}'`);
    }
}

module.exports = new Server();