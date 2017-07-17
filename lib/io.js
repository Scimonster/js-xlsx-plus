"use strict"; // eslint-disable-line quotes

var XLSX = require('xlsx');
var _ = require('lodash');
var fs = require('fs');

var Workbook = require('./workbook');

function read(data, options) {
    return new Workbook(XLSX.read(data, options));
}
exports.read = read;

function readFileSync(filename, options) {
    return new Workbook(XLSX.readFileSync(filename, options));
}
exports.readFileSync = readFileSync;

function readFile(filename, options, cb) {
    if (_.isFunction(options)) {
        // readFile(filename, cb)
        cb = options;
        options = undefined;
    }
    if (!_.isFunction(cb)) {
        // readFile(filename, [options])
        // for compatibility
        return readFileSync(filename, options);
    }
    // readFile(filename, [options], cb)
    fs.readFile(filename, function (err, data) {
        if (err) {
            return cb(err);
        }
        cb(null, read(data, options));
    });
}
exports.readFile = readFile;

function readFileAsync(filename, options, cb) {
    if (_.isFunction(options)) {
        // readFileAsync(filename, cb)
        cb = options;
        options = undefined;
    }
    if (_.isFunction(cb)) {
        // readFileAsync(filename, [options], cb)
        // future compatibility, in case xlsx adds a callback style readFileAsync
        return readFile(filename, options, cb);
    }
    // readFileAsync(filename, [options])
    return new Promise(function (resolve, reject) {
        fs.readFile(filename, function (err, data) {
            if (err) {
                return reject(err);
            }
            resolve(read(data, options));
        });
    });
}
exports.readFileAsync = readFileAsync;

function writeFileAsync(filename, wb, options, cb) {
    if (filename instanceof Workbook) {
        // writeFileAsync(wb, filename, [options], [cb])
        var _wb = filename;
        filename = wb;
        wb = _wb;
    }
    if (_.isFunction(options)) {
        // writeFileAsync(filename, wb, cb)
        cb = options;
        options = undefined;
    }
    if (_.isFunction(cb)) {
        // writeFileAsync(filename, wb, [options], cb)
        // compatibility
        return XLSX.writeFileAsync(filename, wb, options, cb);
    }
    // writeFileAsync(filename, wb, [options])
    return new Promise(function (resolve, reject) {
        XLSX.writeFileAsync(filename, wb, options, function (err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}
exports.writeFileAsync = writeFileAsync;