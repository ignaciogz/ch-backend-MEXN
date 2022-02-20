class Server {
    routeNotImplemented(req, res, next) {
        res.status(404).json({
            error: '-2', 
            descripcion: `ruta: '${req.path}' metodo: '${req.method}' NO implementada`
        })
    }
}

module.exports = new Server();