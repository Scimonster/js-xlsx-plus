"use strict"; // eslint-disable-line quotes

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var util = require('./util');
var _ = require('lodash');

var Data = require('./1d_data');

var Column = function (_Data) {
    _inherits(Column, _Data);

    function Column(data, _num, ws) {
        _classCallCheck(this, Column);

        _num = _num || 0;
        var num = util.encode_col(_num);
        if (_.isObject(data)) {
            if (data['!ref']) {
                var range = util.decode_range(data['!ref']);
                var s = range.s.r,
                    e = range.e.r,
                    c = range.s.c;
                if (e < s) {
                    // prevent an infinite loop
                    var t = e; // support platforms that don't support destructuring
                    e = s;
                    s = t;
                }
                var arr = [];
                for (var i = s; i <= e; i++) {
                    arr.push(data[util.encode_cell({ c: c, r: i })]);
                }

                var _this = _possibleConstructorReturn(this, (Column.__proto__ || Object.getPrototypeOf(Column)).call(this, arr, num, ws));

                _.extend(_this, data);
                return _possibleConstructorReturn(_this);
            } else {
                data = _.values(data);
            }
        }
        if (_.isArray(data)) {
            var _this = _possibleConstructorReturn(this, (Column.__proto__ || Object.getPrototypeOf(Column)).call(this, data, num, ws));

            _this['!ref'] = util.encode_range({ s: { c: _num, r: 0 }, e: { c: _num, r: data.length - 1 } });
            data.forEach(function (cell, r) {
                _this[util.encode_cell({ c: _num, r: r })] = cell;
            });
        } else {
            throw new TypeError('could not parse data provided to Column');
        }
        return _possibleConstructorReturn(_this);
    }

    _createClass(Column, [{
        key: 'get',
        value: function get(i) {
            if (_.isString(i)) {
                i = util.decode_row(i);
            }
            return _get(Column.prototype.__proto__ || Object.getPrototypeOf(Column.prototype), 'get', this).call(this, i);
        }
    }]);

    return Column;
}(Data);

module.exports = Column;