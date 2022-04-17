const chatSchema = (table) => {
    table.increments("id").primary(),
    table.string("timestamp"),
    table.json('autor'),
    table.string("msj")
};
 
module.exports = chatSchema;