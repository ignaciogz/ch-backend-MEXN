require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    PORT: process.env.PORT,
    SELECTED_GENERAL_STORAGE: process.env.GENERAL_STORAGE || "Memory",
    SELECTED_CHAT_STORAGE: process.env.CHAT_STORAGE || "Memory",
}

const DB = {
    mariaDB: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME || "ecommerceD11",
        },
        pool: {
            min: 0,
            max: 7
        },
        useNullAsDefault: true
    },
    mongoDB: {
        uri: `mongodb://${process.env.MONGO_DB_HOST || "localhost"}:${process.env.MONGO_DB_PORT || "27017"}/${process.env.MONGO_DB_NAME || "ecommerceD11"}`,
        atlas_uri: `${process.env.MONGO_ATLAS}` || ""
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: `./data/db/${process.env.DB_NAME || "ecommerceD11"}.sqlite`
        },
        pool: {
            min: 0,
            max: 7
        },
        useNullAsDefault: true
    }
}

module.exports = { config, DB };