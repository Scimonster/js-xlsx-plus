"use strict"; // eslint-disable-line quotes
const util = require('./util');
const _ = require('lodash');

const Data = require('./1d_data');

class Row extends Data {
    constructor(data, _num, ws) {
        _num = _num || 0;
        const num = util.encode_row(_num);
        if (_.isObject(data)) {
            if (data['!ref']) {
                const range = util.decode_range(data['!ref']);
                let s = range.s.c, e = range.e.c, r = range.s.r;
                if (e < s) { // prevent an infinite loop
                    let t = e; // support platforms that don't support destructuring
                    e = s;
                    s = t;
                }
                let arr = [];
                for (let i = s; i <= e; i++) {
                    arr.push(data[util.encode_cell({c: i, r})]);
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
            this['!ref'] = util.encode_range({s: {c: 0, r: _num}, e: {c: data.length-1, r: _num}});
            data.forEach((cell, c)=>{
                this[util.encode_cell({r: _num, c})] = cell;
            });
        } else {
            throw new TypeError('could not parse data provided to Row');
        }
    }

    get(i) {
        if (_.isString(i)) {
            i = util.decode_col(i);
        }
        return super.get(i);
    }
}
module.exports = Row;
