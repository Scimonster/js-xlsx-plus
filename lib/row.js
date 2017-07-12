"use strict"; // eslint-disable-line quotes

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var util = require('./util');
var _ = require('lodash');

var Data = require('./1d_data');

var Row = function (_Data) {
    _inherits(Row, _Data);

    function Row(data, _num, ws) {
        _classCallCheck(this, Row);

        _num = _num || 0;
        var num = util.encode_row(_num);
        if (_.isObject(data)) {
            if (data['!ref']) {
                var range = util.decode_range(data['!ref']);
                var s = range.s.c,
                    e = range.e.c,
                    r = range.s.r;
                if (e < s) {
                    // prevent an infinite loop
                    var t = e; // support platforms that don't support destructuring
                    e = s;
                    s = t;
                }
                var arr = [];
                for (var i = s; i <= e; i++) {
                    arr.push(data[util.encode_cell({ c: i, r: r })]);
                }

                var _this = _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).call(this, arr, num, ws));

                _.extend(_this, data);
                return _possibleConstructorReturn(_this);
            } else {
                data = _.values(data);
            }
        }
        if (_.isArray(data)) {
            var _this = _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).call(this, data, num, ws));

            _this['!ref'] = util.encode_range({ s: { c: 0, r: _num }, e: { c: data.length - 1, r: _num } });
            data.forEach(function (cell, c) {
                _this[util.encode_cell({ r: _num, c: c })] = cell;
            });
        } else {
            throw new TypeError('could not parse data provided to Row');
        }
        return _possibleConstructorReturn(_this);
    }

    _createClass(Row, [{
        key: 'get',
        value: function get(i) {
            if (_.isString(i)) {
                i = util.decode_col(i);
            }
            return _get(Row.prototype.__proto__ || Object.getPrototypeOf(Row.prototype), 'get', this).call(this, i);
        }
    }]);

    return Row;
}(Data);

module.exports = Row;