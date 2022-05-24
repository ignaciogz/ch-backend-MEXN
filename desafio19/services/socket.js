const { chatSchema } = require("../models/schemas/normalize/chat");
const { productsDao, chatDao } = require('../models/daos');
const { NormalizeTools } = require("../utils/tools");
const { errorLog: loggerWinston } = require("../utils/loggers/winston");

const productSocket = io => {
    return async productoNuevo => {
        try {
            let arrayProductos = await productsDao.getAll();
            let existenProductos = arrayProductos.length > 0;
            
            await productsDao.save(productoNuevo);
            arrayProductos.push(productoNuevo);
            
            if(!existenProductos) {
                let arrayMsjs = await chatDao.getAll();
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
            let arrayMsjs = await chatDao.getAll();
            let existenMsjs = arrayMsjs.length > 0;

            await chatDao.save(mensajeNuevo);
            arrayMsjs.push(mensajeNuevo);

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

const socket = io => {
    return async socket => {
        console.log('Usuario conectado: ', socket.id);
        
        let arrayProductos = await productsDao.getAll();
        let arrayMsjs = await chatDao.getAll();
        
            arrayMsjs = NormalizeTools.getNormalizeData(arrayMsjs, chatSchema, "mensajes");

        socket.emit('init', { arrayProductos, arrayMsjs });

        socket.on("new-product", productSocket(io));
        socket.on("new-message", messageSocket(io));
    }
}

module.exports = io => {
    io.on('connection', socket(io));
}