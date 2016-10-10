"use strict"; // eslint-disable-line quotes
const _ = require('lodash');

class Data {
    constructor(data, name, ws) {
        if (_.isArray(data)) {
            this.data = data;
        } else {
            throw new TypeError('data provided to 1D data super-class must be an array');
        }
        this.name = name;
        this.ws = ws;
    }

    get(i) {
        return this.data[i];
    }

    getValues() {
        return _.map(this.data, 'v');
    }
}
module.exports = Data;
