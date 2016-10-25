"use strict"; // eslint-disable-line quotes
const util = require('./util');
const _ = require('lodash');

const Row = require('./row');
const Column = require('./col');

class Worksheet {
    constructor(data, name, wb) {
        if (data['!ref']) {
            _.extend(this, data);
        } else if (_.isArray(data)) {
            let maxLength = 0;
            data.forEach((row, r)=>{
                row.forEach((cell, c)=>{
                    let t;
                    switch (typeof cell) {
                        case 'string':
                            t = 's';
                            break;
                        case 'number':
                            t = 'n';
                            break;
                        case 'boolean':
                            t = 'b';
                            break;
                        case 'object':
                            if (_.isDate(cell)) {
                                t = 'd';
                                break;
                            }
                            // else falls through
                        default:
                            t = 's';
                            break;
                    }
                    this[util.encode_cell({c, r})] = _.isObject(cell) ? cell : {v: cell, t};
                });
                maxLength = Math.max(maxLength, row.length-1);
            });
            this['!ref'] = util.encode_range({s: util.decode_cell('A1'), e: {c: maxLength, r: Math.max(data.length-1,0)}});
        }

        this.name = name;
        this._workbook = wb;
    }

    getCell() {
        let cell;
        switch (arguments.length) {
            case 1:
                cell = arguments[0];
                if (_.isObject(arguments[0])) {
                    return this[util.encode_cell(arguments[0])];
                } else if (_.isString(arguments[0])) {
                    return this[cell];
                }
                break;
            case 2:
                return this.getCell({
                    r: arguments[0],
                    c: arguments[1]
                });
        }
        throw new TypeError('bad arguments passed to getCell');
    }

    getCol(col) {
        col = util.decode_col(col);
        let col_obj = _.pickBy(this, (val, key)=>col==util.decode_cell(key).c);
        let range = util.decode_range(this['!ref']);
        col_obj['!ref'] = util.encode_range({s: {c: col, r: range.s.r}, e: {c: col, r: range.e.r}});
        return new Column(col_obj, col, this);
    }

    getRow(_row) {
        let row = util.decode_row(_row);
        let row_obj = _.pickBy(this, (val, key)=>row==util.decode_cell(key).r);
        let range = util.decode_range(this['!ref']);
        row_obj['!ref'] = util.encode_range({s: {c: range.s.c, r: row}, e: {c: range.e.c, r: row}});
        return new Row(row_obj, row, this);
    }

    getRange(range) {
        let r = _.pickBy(this, (val, key)=>util.cell_in_range(key, range));
        r['!ref'] = range;
        return new Worksheet(r, this.name, this._workbook);
    }

    toJSON(opts) {
        const defaultOpts = {
            raw: true
        };
        opts = _.extend(defaultOpts, opts);
        return util.sheet_to_json(this, opts);
    }

    toArray(opts) {
        const defaultOpts = {
            raw: true,
            header: 1
        };
        opts = _.extend(defaultOpts, opts);
        return util.sheet_to_json(this, opts);
    }

    toCSV(opts) {
        opts = opts || {};
        const defaultOpts = {
            FS: opts.delimiter,
            RS: opts.line
        };
        opts = _.extend(defaultOpts, opts);
        return util.sheet_to_csv(this, opts);
    }
}
module.exports = Worksheet;
