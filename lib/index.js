"use strict"; // eslint-disable-line quotes
const XLSX = require('xlsx');
const util = XLSX.utils;
const _ = require('lodash');

_.extend(exports, XLSX);
exports.version = require('./package.json').version;

class Workbook {
    constructor(x_wb) {
        _.extend(this, x_wb);
        this.Sheets = _.mapValues(this.Sheets, (sheet, name)=>new Worksheet(sheet, name));
    }
}
exports.Workbook = Workbook;

class Worksheet {
    constructor(x_ws, name) {
        _.extend(this, x_ws);
        this.name = name;
    }
}
exports.Worksheet = Worksheet;

function readFileSync(filename, options) {
    return new Workbook(XLSX.readFileSync(filename, options));
}
exports.readFileSync = readFileSync;
