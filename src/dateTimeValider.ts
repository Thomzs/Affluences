const isStringObject = require ("util/types");
const moment = require("moment");

const format = [ "YYYY-MM-DD HH:mm:ss" ];

const dateTimeValider = function (dateTime: any): boolean {
    try {
        return moment(dateTime, format, true).isValid();
    } catch (e) {
        return false;
    }
}

module.exports = dateTimeValider;