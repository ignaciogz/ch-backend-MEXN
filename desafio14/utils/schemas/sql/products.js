const productsSchema = (table) => {
    table.increments("id").primary(),
    table.string("title"),
    table.float("price"),
    table.string("thumbnail"),
    table.string("timestamp")
};
 
module.exports = productsSchema;