"use strict"; // eslint-disable-line quotes
const XLSX = require('xlsx');
const util = XLSX.utils;
const _ = require('lodash');

const Data = require('./1d_data');

class Column extends Data {
    constructor(data, _num, ws) {
        _num = _num || 0;
        const num = util.encode_col(_num);
        if (_.isObject(data)) {
            if (data['!ref']) {
                const range = util.decode_range(data['!ref']);
                let s = range.s.c, e = range.e.c, r = range.s.r;
                if (e < s) { // prevent an infinite loop
                    let t = e; // support systems that don't support destructuring
                    e = s;
                    s = t;
                }
                let arr = [];
                for (let i = s; i <= e; i++) {
                    arr.push(data[util.encode_cell(i, r)]);
                }
                super(arr, num, ws);
                _.extend(this, data);
                return;
            } else {
                data = _.values(data);
            }
        }
        if (_.isArray(data)) {
            super(data, num, ws);
            this['!ref'] = util.encode_range({s: {c: _num, r: 0}, e: {c: _num, r: data.length-1}});
            data.forEach((cell, r)=>{
                this[util.encode_cell({c: _num, r})] = cell;
            });
        } else {
            throw new TypeError('could not parse data provided to Column');
        }
    }

    get(i) {
        if (_.isString(i)) {
            i = util.decode_row(i);
        }
        return super.get(i);
    }
}
module.exports = Column;
