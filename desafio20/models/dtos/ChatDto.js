class ChatDto {
    constructor(data) {
        this.autor = data.autor;
        this.id = data.id || null;
        this.msj = data.msj;
        this.timestamp = data.timestamp || null;
    }
}

module.exports = ChatDto;