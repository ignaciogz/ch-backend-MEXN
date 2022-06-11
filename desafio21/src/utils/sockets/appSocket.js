const { productsDao } = require('../../models/daos');
const { chatSchema } = require("../../models/schemas/normalize/chat");
const { NormalizeTools } = require("../tools");
const { errorLog: loggerWinston } = require("../loggers/winston");

const chatRepo = require('../../repositories/ChatRepo');

const productSocket = io => {
    return async productoNuevo => {
        try {
            let arrayProductos = await productsDao.getAll();
            let existenProductos = arrayProductos.length > 0;
            
            await productsDao.save(productoNuevo);
            arrayProductos = await productsDao.getAll();
            
            if(!existenProductos) {
                let arrayMsjs = await chatRepo.getAll();
                arrayMsjs = NormalizeTools.getNormalizeData(arrayMsjs, chatSchema, "mensajes");

                io.sockets.emit('renderView', { arrayProductos, arrayMsjs });
            } else {
                io.sockets.emit('renderNewProduct', { arrayProductos });
            }
        } catch (error) {
            loggerWinston.error(`API Productos -> Error: ${error.message}`)
        }
    }
}

const messageSocket = io => {
    return async mensajeNuevo => {
        try {
            let arrayMsjs = await chatRepo.getAll();
            let existenMsjs = arrayMsjs.length > 0;
            
            await chatRepo.save(mensajeNuevo);
            arrayMsjs = await chatRepo.getAll();

            arrayMsjs = NormalizeTools.getNormalizeData(arrayMsjs, chatSchema, "mensajes");

            if(!existenMsjs) {
                let arrayProductos = await productsDao.getAll();
                io.sockets.emit('renderView', { arrayProductos, arrayMsjs });
            } else {
                io.sockets.emit('renderNewMessage', { arrayMsjs });
            }
        } catch (error) {
            loggerWinston.error(`API Mensajes -> Error: ${error.message}`)
        }
    }
}

const initSocket = io => {
    return async socket => {
        console.log('Usuario conectado: ', socket.id);
        
        let arrayProductos = await productsDao.getAll();
        let arrayMsjs = await chatRepo.getAll();
        
        arrayMsjs = NormalizeTools.getNormalizeData(arrayMsjs, chatSchema, "mensajes");

        socket.emit('init', { arrayProductos, arrayMsjs });

        socket.on("new-product", productSocket(io));
        socket.on("new-message", messageSocket(io));
    }
}

module.exports = io => {
    io.on('connection', initSocket(io));
}