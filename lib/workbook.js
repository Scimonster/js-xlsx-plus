"use strict"; // eslint-disable-line quotes
const _ = require('lodash');

const Worksheet = require('./worksheet');

class Workbook {
    constructor(x_wb) {
        _.extend(this, x_wb);
        this.Sheets = _.mapValues(this.Sheets, (sheet, name)=>new Worksheet(sheet, name, this));
    }
}
module.exports = Workbook;
