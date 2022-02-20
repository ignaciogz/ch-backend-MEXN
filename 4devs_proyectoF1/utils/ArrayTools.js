class ArrayTools {
    static getIndexByID(array, id) {
        return array.findIndex(element => element.id == id);
    }
}

module.exports = ArrayTools;