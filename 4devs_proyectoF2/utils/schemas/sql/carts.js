const cartsSchema = (table) => {
    table.increments("id").primary(),
    table.string("timestamp"),
    table.json('items')
}

module.exports = cartsSchema;