const chatSchema = {
	id: { type: Number, required: true },
	timestamp: { type: String, required: true },
	autor: {
		id: { type: String, required: true },
		nombre: { type: String, required: true },
		apellido: { type: String, required: true },
		edad: { type: Number, required: true },
		alias: { type: String, required: true },
		avatar: { type: String, required: true },
	},
	msj: { type: String, required: true },
};

module.exports = chatSchema;