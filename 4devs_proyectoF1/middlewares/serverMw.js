module.exports.routeNotImplemented = (req, res) => {
    res.status(404).json({
        error: '-2', 
        descripcion: `ruta: '${req.path}' metodo: '${req.method}' NO implementada`
    });
}