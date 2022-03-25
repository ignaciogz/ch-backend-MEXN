const productsSchema = (table) => {
    table.increments("id").primary(),
    table.string("nombre"),
    table.float("precio"),
    table.string("foto"),
    table.integer("stock"),
    table.string("codigo"),
    table.string("descripcion"),
    table.string("timestamp")
};

module.exports = productsSchema;