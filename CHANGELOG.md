## v0.2.0 - 2017/07/12

 - Update XLSX version to 0.10.8
 - Add ES5-compatible `lib` directory; move ES6 to `src`

## v0.1.2 - 2017/02/15

 - Add creating empty workbook [dplusic]
 - Add `Workbook#addSheet` [dplusic]
 - Compile for browser

## v0.1.1 - 2016/10/31

 - Update util `encode_cell` to accept strings
 - Support exporting `toJSON` as object of arrays
 - Speed improvement to `getRow` and `getCol`
 - Improvement to `Worksheet#getCell`

Bugfixes:

 - 1d_data will return empty cell instead of undefined when missing
 - Fix Column and Row constructors

## v0.1.0 - 2016/10/13

 - Initial upload
