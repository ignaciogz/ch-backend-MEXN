class ObjectTools {
    static removeAllPropertiesExcept(obj, props = []) {
        let newObj = {};

        for (const prop of props) {
            if (obj.hasOwnProperty(prop)) {
                newObj[prop] = obj[prop];
            }
        }

        return newObj;
    }
}

module.exports = ObjectTools;