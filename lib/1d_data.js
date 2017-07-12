"use strict"; // eslint-disable-line quotes

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');

var Data = function () {
    function Data(data, name, ws) {
        _classCallCheck(this, Data);

        if (_.isArray(data)) {
            this.data = data;
        } else {
            throw new TypeError('data provided to 1D data super-class must be an array');
        }
        this.name = name;
        this.ws = ws;
    }

    _createClass(Data, [{
        key: 'get',
        value: function get(i) {
            return this.data[i] || {
                v: '',
                t: 's'
            };
        }
    }, {
        key: 'getValues',
        value: function getValues() {
            return _.map(this.data, 'v');
        }
    }]);

    return Data;
}();

module.exports = Data;