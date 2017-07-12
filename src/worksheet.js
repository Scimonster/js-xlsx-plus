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
            if (_.isArray(data[0])) {
                _.extend(this, util.aoa_to_sheet(data));
            } else {
                _.extend(this, util.json_to_sheet(data));
            }
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
        let range = util.decode_range(this['!ref']);
        let col_obj = {
            '!ref': util.encode_range({
                s: {c: col, r: range.s.r},
                e: {c: col, r: range.e.r}
            })
        };
        for (let r = range.s.r; r < range.e.r; r++) {
            let cell = util.encode_cell({c: col, r});
            col_obj[cell] = this[cell];
        }
        return new Column(col_obj, col, this);
    }

    getRow(row) {
        row = util.decode_row(row);
        let range = util.decode_range(this['!ref']);
        let row_obj = {
            '!ref': util.encode_range({
                s: {c: range.s.c, r: row},
                e: {c: range.e.c, r: row}
            })
        };
        for (let c = range.s.c; c < range.e.c; c++) {
            let cell = util.encode_cell({c, r: row});
            row_obj[cell] = this[cell];
        }
        return new Row(row_obj, row, this);
    }

    getRange(range) {
        let r = _.pickBy(this, (val, key)=>util.cell_in_range(key, range));
        r['!ref'] = range;
        return new Worksheet(r, this.name, this._workbook);
    }

    toJSON(opts) {
        const defaultOpts = {
            raw: true,
            array: true
        };
        opts = _.extend(defaultOpts, opts);
        let data = util.sheet_to_json(this, opts);
        if (opts.array) {
            return data;
        } else {
            return _.fromPairs(_.keys(data[0]).map(key=>[key, data.map(v=>v[key])]));
        }
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
