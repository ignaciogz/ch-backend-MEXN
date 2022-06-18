let winston = require("winston");

const logger = { 
    infoLog: winston.createLogger({
        level: "info",
        transports: [
            new winston.transports.Console()
        ]
    }),
    warnLog: winston.createLogger({
        level: "warn",
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({
                filename: './src/data/logs/warn.log',
            }),
        ]
    }),
    errorLog: winston.createLogger({
        level: "error",
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({
                filename: './src/data/logs/error.log',
            }),
        ]
    })
}

module.exports = logger;