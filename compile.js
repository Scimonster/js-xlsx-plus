const browserify = require('browserify');
const aliasify = require('aliasify');
const babelify = require('babelify');
const packageJsonVersionify = require('package-json-versionify');
const uglifyjs = require('uglify-js');
const fs = require('fs');

const outFileName = 'dist/xlsx-plus.js';
const outFileNameMin = 'dist/xlsx-plus.min.js';
const output = fs.createWriteStream(outFileName);
fs.createReadStream(require.resolve('xlsx/dist/xlsx.core.min.js')).pipe(output, {end: false}); // start it off with the global XLSX

const b = browserify({debug:false});
b.add(require.resolve('./lib/client.js'), {entry: true});
b.transform(babelify, {presets: ['es2015']});
b.transform(aliasify, {
    aliases: {
        xlsx: './browser-xlsx'
    },
    verbose: false
});
b.transform(packageJsonVersionify);
b.bundle().pipe(output);

output.on('close', function minify() {
    const result = uglifyjs.minify(outFileName);
    fs.writeFileSync(outFileNameMin, result.code);
});
