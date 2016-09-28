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

    getCell(cell) {
        return this[cell];
    }

    getCol(col) {
        col = util.decode_col(col);
        return _.pickBy(this, (val, key)=>col==util.decode_cell(key).c);
    }

    getRow(row) {
        row = util.decode_row(row);
        return _.pickBy(this, (val, key)=>row==util.decode_cell(key).r);
    }
}
module.exports = Worksheet;
