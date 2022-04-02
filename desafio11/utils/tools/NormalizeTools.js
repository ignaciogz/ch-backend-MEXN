let { normalize } = require("normalizr");
let InspectTools = require("./InspectTools");

class NormalizeTools {
    static getNormalizeData(data, schema, id, showInfo = false) {
        let toNormalizeData = { 
            id
        };
        toNormalizeData[`${id}`] = data;
    
        let normalizeData = normalize(toNormalizeData, schema);

        if(showInfo) {
            InspectTools.normalizeInfo(toNormalizeData, normalizeData);
        }
        
        return normalizeData;
    }
}

module.exports = NormalizeTools;