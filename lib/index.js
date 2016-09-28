"use strict"; // eslint-disable-line quotes
const XLSX = require('xlsx');
const _ = require('lodash');

const io = require('./io');
const Worksheet = require('./worksheet');
const Workbook = require('./workbook');

_.extend(exports, XLSX);
exports.version = require('../package.json').version;

_.extend(exports, io);

exports.Workbook = Workbook;
exports.Worksheet = Worksheet;
