"use strict"; // eslint-disable-line quotes
const XLSX = require('xlsx');
const util = XLSX.utils;
const _ = require('lodash');

_.extend(exports, util);

exports.cell_in_range = function(cell, range) {
    cell = util.decode_cell(cell);
    range = util.decode_range(range);
    return range.s.c <= cell.c && range.s.r <= cell.r && range.e.c >= cell.c && range.e.r >= cell.r;
};
