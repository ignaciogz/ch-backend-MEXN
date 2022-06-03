const { DB } = require('./');
const mongoose = require("mongoose");

const MONGO_LOCAL_URI = DB.mongoDB.uri;
const MONGO_ATLAS_URI = DB.mongoDB.atlas_uri;

(async () => {
    mongoose.connect(MONGO_ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(()=>{ 
        console.log("--------------------------------------------------------------------");
        console.log("mongodb is connected !");
    })
    .catch(error => console.log(error));
})();

module.exports = { mongoose };