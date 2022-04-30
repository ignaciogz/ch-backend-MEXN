class ArrayTools {
    static getIndexOfElementID(array, id) {
        return array.findIndex(element => element.id == id);
    }
}

module.exports = ArrayTools;