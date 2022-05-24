const service = require('../services/fork');

process.on('message', msg => {
    const { cant } = msg;

    const resultado = service.contarNumerosRandomGenerados(cant);
    process.send({ resultado });
});