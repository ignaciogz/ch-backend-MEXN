const util = require("util");

class InspectTools {
    static log(obj) {
        console.log(util.inspect(obj, false, 12, true));
    }

    static normalizeInfo(toNormalizeData, normalizeData) {
        InspectTools.log(normalizeData);
        console.log("Longitud Normal ----->", JSON.stringify(toNormalizeData).length);
        console.log("Longitud Normalizada ----->", JSON.stringify(normalizeData).length);
    }

    static denormalizeInfo(deNormalizeData) {
        console.log("Longitud DESNormalizada ----->", JSON.stringify(deNormalizeData).length);
        InspectTools.log(deNormalizeData);
    }
}

module.exports = InspectTools;