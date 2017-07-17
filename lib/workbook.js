"use strict"; // eslint-disable-line quotes

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');

var Worksheet = require('./worksheet');

var Workbook = function () {
    function Workbook(x_wb) {
        var _this = this;

        _classCallCheck(this, Workbook);

        if (x_wb) {
            _.extend(this, x_wb);
            this.Sheets = _.mapValues(this.Sheets, function (sheet, name) {
                return new Worksheet(sheet, name, _this);
            });
        } else {
            this.SheetNames = [];
            this.Sheets = {};
        }
    }

    _createClass(Workbook, [{
        key: 'getSheet',
        value: function getSheet(nameOrIndex) {
            return this.Sheets[nameOrIndex] || this.Sheets[this.SheetNames[nameOrIndex]];
        }
    }, {
        key: 'addSheet',
        value: function addSheet(ws) {
            if (!ws.name) {
                ws.name = 'Sheet' + (this.SheetNames.length + 1);
            }
            this.SheetNames.push(ws.name);
            this.Sheets[ws.name] = ws;
            ws._workbook = this;
        }
    }, {
        key: 'toJSON',
        value: function toJSON(opts) {
            return _.mapValues(this.Sheets, function (s) {
                return s.toJSON(opts);
            });
        }
    }, {
        key: 'toArray',
        value: function toArray(opts) {
            return _.map(this.Sheets, function (s) {
                return s.toArray(opts);
            });
        }
    }]);

    return Workbook;
}();

module.exports = Workbook;