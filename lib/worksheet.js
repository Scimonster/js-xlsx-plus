"use strict"; // eslint-disable-line quotes

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = require('./util');
var _ = require('lodash');

var Row = require('./row');
var Column = require('./col');

var Worksheet = function () {
    function Worksheet(data, name, wb) {
        _classCallCheck(this, Worksheet);

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

    _createClass(Worksheet, [{
        key: 'getCell',
        value: function getCell() {
            var cell = void 0;
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
    }, {
        key: 'getCol',
        value: function getCol(col) {
            col = util.decode_col(col);
            var range = util.decode_range(this['!ref']);
            var col_obj = {
                '!ref': util.encode_range({
                    s: { c: col, r: range.s.r },
                    e: { c: col, r: range.e.r }
                })
            };
            for (var r = range.s.r; r < range.e.r; r++) {
                var cell = util.encode_cell({ c: col, r: r });
                col_obj[cell] = this[cell];
            }
            return new Column(col_obj, col, this);
        }
    }, {
        key: 'getRow',
        value: function getRow(row) {
            row = util.decode_row(row);
            var range = util.decode_range(this['!ref']);
            var row_obj = {
                '!ref': util.encode_range({
                    s: { c: range.s.c, r: row },
                    e: { c: range.e.c, r: row }
                })
            };
            for (var c = range.s.c; c < range.e.c; c++) {
                var cell = util.encode_cell({ c: c, r: row });
                row_obj[cell] = this[cell];
            }
            return new Row(row_obj, row, this);
        }
    }, {
        key: 'getRange',
        value: function getRange(range) {
            var r = _.pickBy(this, function (val, key) {
                return util.cell_in_range(key, range);
            });
            r['!ref'] = range;
            return new Worksheet(r, this.name, this._workbook);
        }
    }, {
        key: 'toJSON',
        value: function toJSON(opts) {
            var defaultOpts = {
                raw: true,
                array: true
            };
            opts = _.extend(defaultOpts, opts);
            var data = util.sheet_to_json(this, opts);
            if (opts.array) {
                return data;
            } else {
                return _.fromPairs(_.keys(data[0]).map(function (key) {
                    return [key, data.map(function (v) {
                        return v[key];
                    })];
                }));
            }
        }
    }, {
        key: 'toArray',
        value: function toArray(opts) {
            var defaultOpts = {
                raw: true,
                header: 1
            };
            opts = _.extend(defaultOpts, opts);
            return util.sheet_to_json(this, opts);
        }
    }, {
        key: 'toCSV',
        value: function toCSV(opts) {
            opts = opts || {};
            var defaultOpts = {
                FS: opts.delimiter,
                RS: opts.line
            };
            opts = _.extend(defaultOpts, opts);
            return util.sheet_to_csv(this, opts);
        }
    }]);

    return Worksheet;
}();

module.exports = Worksheet;