# xlsx-plus
A wrapper for [js-xlsx](https://github.com/SheetJS/js-xlsx) with a simpler API. Can be used as a dropin.

```
npm install xlsx-plus
```

Versions for the browser are in the dist folder. There is the core version, which is a smaller file, and the full version, which includes ODS and international support.

It supports Promise-based I/O. Bring your own Promise (assumes the presence of a correctly-implemented `Promise` global).


## Changes

### Top-level API

The entire XLSX top-level API is copied, with some changed and additions:

#### `read(data, [options])`

Returns a `Workbook` object; each sheet is a `Worksheet` object

#### `readFile(filename, [options], [cb])`

Supports an asynchronous signature while retaining support for operating synchronously

#### `readFileAsync(filename, [options], [cb])` (added v0.3.0)

Explicitly asynchronous version. If the callback is not supplied it returns a Promise (requires `Promise` global).

### `writeFileAsync(filename, wb, [options], [cb])`
### `writeFileAsync(wb, filename, [options], [cb])` (added v0.3.0)

Returns a Promise if callback is not passed. Also supports passing a Workbook object as the first parameter, to match the built-in `writeFile(wb, filename, [options])`.

### Utils

`utils` is duplicated as `util`.

- extra function `cell_in_range`

- `encode_cell` accepts an object with string keys as well

### `Worksheet` API

Exported as XLSX.Worksheet.

#### `constructor(data, name, workbook)`

Accepts data as an XLSX-style object (with a `!ref` property), an array of arrays, or an array of objects.

#### `getCell(address)`

Returns the cell object with that address.

#### `getRow(row)`

Returns a `Row` object.

#### `getCol(col)`

Returns a `Column` object.

#### `getRange(range)`

Returns a subset `Worksheet`. Keeps references to the original workbook and name.

#### `toJSON(opts)`

Exports the sheet as JSON. The default format is to use the first row as a header. To use column names as a header, pass `{header: 'A'}`. To use custom values, pass `{header: ['col1 header', 'col2 header']}`. The exported format is: `[{'col1 header': B1Value, 'col2 header': B2Value}, ...]`. For an object of arrays (`{col1: [B1, C1, ...], col2: [...]}`), pass `{array: false}` (any falsey value).

It automatically transforms values to their primitive formats. To disable this, pass `{raw: false}`.

#### `toArray(opts)`

Like `toJSON`, but returns an array of arrays instead of an array of objects. So: `[[A1Value, A2Value], [B1Value, B2Value], ...]`.

#### `toCSV(opts)`

Returns a CSV string of the worksheet. Default delimiter is a comma; default row ending is a newline. You can change this by passing `{delimiter: '\t', line: '\r\n'}` (for example).

### `Workbook` API

Not much. Only contains wrappers for `toJSON` and `toArray`. `toJSON` gives an object with the sheet names as keys; `toArray` gives an array of sheets. The values are the result of calling `toJSON` or `toArray` on the sheet object.

#### `getSheet(nameOrIndex)` (added v0.3.0)

Return the sheet with the given name or index. So you can do `getSheet(0)` to get the first one.

#### `addSheet(sheet)` (added v0.1.2)

Adds a Worksheet object to the workbook.

As of v0.3.0, if the sheet does not have a name, it will be given a default name (SheetN).

### `Row` and `Column` object API

Both are subclasses of a `Data` class; neither are exported.

#### `get(address)`

Returns the cell object at the given row or column (depending on datatype) if `address` is a string. If `address` is a number, treat it as a numerical index.

#### `getValues()`

Returns an array of cell *values*.

## License

MIT

## Maintenance Notes

This is just the bare bones of the library now. I needed this much for a project, and don't have time to continue working on it past this. Pull requests are appreciated.

## Credits

Made by Eyal Schachter (Scimonster).

Developed for David Burg, PhD at the Shamir Research Institute.
