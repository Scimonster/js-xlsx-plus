/* eslint-disable no-console */
const browserify = require('browserify');
const aliasify = require('aliasify');
const babelify = require('babelify');
const packageJsonVersionify = require('package-json-versionify');
const uglifyjs = require('uglify-js');
const fs = require('fs');

function compile(outFileName, outFileNameMin, xlsxVersion) {
    const output = fs.createWriteStream(outFileName);
    fs.createReadStream(require.resolve(xlsxVersion)).pipe(output, {end: false}); // start it off with the global XLSX

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
    console.log('Compiling '+outFileName);

    output.on('close', function minify() {
        const result = uglifyjs.minify(outFileName);
        fs.writeFile(outFileNameMin, result.code, function(err) {
            if (err) {
                console.error('Error minifying '+outFileNameMin);
            } else {
                console.log('Minifying '+outFileNameMin);
            }
        });
    });
}

const outFileName = 'dist/xlsx-plus.core.js';
const outFileNameMin = 'dist/xlsx-plus.core.min.js';
const xlsxVersion = 'xlsx/dist/xlsx.core.min.js';
compile(outFileName, outFileNameMin, xlsxVersion);

const full_outFileName = 'dist/xlsx-plus.full.js';
const full_outFileNameMin = 'dist/xlsx-plus.full.min.js';
const full_xlsxVersion = 'xlsx/dist/xlsx.full.min.js';
compile(full_outFileName, full_outFileNameMin, full_xlsxVersion);
