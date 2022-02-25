require("dotenv").config();

let config = {
    dev: process.env.NODE_ENV !== 'production',
    PORT: process.env.PORT
}

let db = {
    mariaDB: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'ecommerce',
        },
        pool: {
            min: 0,
            max: 7
        },
        useNullAsDefault: true
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./DB/${process.env.DB_NAME || 'ecommerce'}.sqlite`
        },
        pool: {
            min: 0,
            max: 7
        },
        useNullAsDefault: true
    }
}


module.exports = { config, db }