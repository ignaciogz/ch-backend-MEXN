const productsSchema = {
	id: { type: Number, required: true },
	title: { type: String, required: true },
	price: { type: Number, required: true },
	thumbnail: { type: String, required: true },
	timestamp: { type: String, required: true }
};

module.exports = productsSchema;