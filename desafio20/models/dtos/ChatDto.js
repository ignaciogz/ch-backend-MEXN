class ChatDto {
    constructor(result) {
        this.autor = JSON.parse(result.autor);
        this.id = result.id || null;
        this.msj = result.msj;
        this.timestamp = result.timestamp || null;
    }
}

module.exports = ChatDto;