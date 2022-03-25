const productsSchema = {
	id: { type: Number, required: true },
	nombre: { type: String, required: true },
	precio: { type: Number, required: true },
	foto: { type: String, required: true },
	stock: { type: Number, required: true },
	codigo: { type: String, required: true },
    descripcion: { type: String, required: true },
	timestamp: { type: String, required: true }
};

module.exports = productsSchema;