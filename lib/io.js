"use strict"; // eslint-disable-line quotes
const XLSX = require('xlsx');
const _ = require('lodash');
const fs = require('fs');

const Workbook = require('./workbook');

function read(data, options) {
    return new Workbook(XLSX.read(data, options));
}
exports.read = read;

function readFileSync(filename, options) {
    return new Workbook(XLSX.readFileSync(filename, options));
}
exports.readFileSync = readFileSync;

function readFile(filename, options, cb) {
    if (_.isFunction(options)) { // readFile(filename, cb)
        cb = options;
        options = undefined;
    }
    if (!_.isFunction(cb)) { // readFile(filename, [options])
        // for compatibility
        return readFileSync(filename, options);
    }
     // readFile(filename, [options], cb)
    fs.readFile(filename, function(err, data){
        if (err) {
            return cb(err);
        }
        cb(null, read(data, options));
    });
}
exports.readFile = readFile;
