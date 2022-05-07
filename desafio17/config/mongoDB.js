const { DB } = require('./');
const mongoose = require("mongoose");

(async ()=>{
    try {
        mongoose.connect(DB.mongoDB.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        })
        .then(()=>{ 
            console.log("--------------------------------------------------------------------");
            console.log("mongodb is connected !");
        })
        .catch(e=>console.log(e));
        
    } catch (error) {
        console.log(error);
    }
})();

module.exports = { mongoose };