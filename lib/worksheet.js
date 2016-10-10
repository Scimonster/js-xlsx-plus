"use strict"; // eslint-disable-line quotes
const XLSX = require('xlsx');
const util = XLSX.utils;
const _ = require('lodash');

class Worksheet {
    constructor(data, name, wb) {
        if (data['!ref']) {
            _.extend(this, data);
        } else if (_.isArray(data)) {
            let maxLength = 0;
            data.forEach((row, r)=>{
                row.forEach((cell, c)=>{
                    this[util.encode_cell({c, r})] = cell;
                });
                maxLength = Math.max(maxLength, row.length-1);
            });
            this['!ref'] = util.encode_range({s: util.decode_cell('A1'), e: {c: maxLength, r: Math.max(data.length-1,0)}});
        }

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
