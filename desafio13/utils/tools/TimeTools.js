const moment = require("moment");

class TimeTools {
    static getTimestamp() {
        return moment().format("DD-MM-YYYY HH:mm:ss");
    }
}

module.exports = TimeTools;