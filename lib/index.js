"use strict"; // eslint-disable-line quotes

var XLSX = require('xlsx');
var _ = require('lodash');

var io = require('./io');
var Worksheet = require('./worksheet');
var Workbook = require('./workbook');

_.extend(exports, XLSX);
exports.version = require('../package.json').version;

_.extend(exports, io);

exports.utils = exports.util = require('./util');

exports.Workbook = Workbook;
exports.Worksheet = Worksheet;