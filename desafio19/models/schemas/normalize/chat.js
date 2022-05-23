const { schema } = require("normalizr");

const autoresSchema = new schema.Entity('autores');

const mensajesSchema = new schema.Entity('mensajes', {
    autor: autoresSchema
});
    
const chatSchema = new schema.Entity('chatSchema', {
    mensajes: [mensajesSchema]
})
 
module.exports = { chatSchema };