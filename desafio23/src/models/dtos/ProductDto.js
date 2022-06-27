class ProductDto {
    constructor(data) {
        this.title = data.title;
        this.id = data.id || null;
        this.price = data.price;
        this.timestamp = data.timestamp || null;
        this.thumbnail = data.thumbnail;
    }
}

module.exports = ProductDto;