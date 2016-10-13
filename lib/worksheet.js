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

    getCell(cell) {
        return this[cell];
    }

    getCol(col) {
        col = util.decode_col(col);
        return new Column(_.pickBy(this, (val, key)=>col==util.decode_cell(key).c), col, this);
    }

    getRow(row) {
        row = util.decode_row(row);
        return new Row(_.pickBy(this, (val, key)=>row==util.decode_cell(key).r), row, this);
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
