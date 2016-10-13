"use strict"; // eslint-disable-line quotes
const _ = require('lodash');

const Worksheet = require('./worksheet');

class Workbook {
    constructor(x_wb) {
        _.extend(this, x_wb);
        this.Sheets = _.mapValues(this.Sheets, (sheet, name)=>new Worksheet(sheet, name, this));
    }

    toJSON(opts) {
        return _.mapValues(this.Sheets, s=>s.toJSON(opts));
    }

    toArray(opts) {
        return _.map(this.Sheets, s=>s.toArray(opts));
    }
}
module.exports = Workbook;
