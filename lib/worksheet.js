"use strict"; // eslint-disable-line quotes
const XLSX = require('xlsx');
const util = XLSX.utils;
const _ = require('lodash');

class Worksheet {
    constructor(x_ws, name, wb) {
        _.extend(this, x_ws);
        this.name = name;
        this._workbook = wb;
    }
}
module.exports = Worksheet;
