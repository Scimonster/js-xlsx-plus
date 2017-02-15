/* globals window */
if (typeof window !== 'undefined' && window.XLSX) {
    module.exports = window.XLSX;
} else {
    module.exports = require('xls'+'x');
}
