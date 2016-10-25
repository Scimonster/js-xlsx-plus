# xlsx-plus
A wrapper for [js-xlsx](https://github.com/SheetJS/js-xlsx) with a simpler API. Can be used as a dropin.

```
npm install xlsx-plus
```


## Changes

- `readFile` supports an asynchronous signature while retaining support for operating synchronously

- `read` returns a `Workbook` object; each sheet is a `Worksheet` object

### Utils

`utils` is duplicated as `util`.

- extra function `cell_in_range`

- `encode_cell` accepts an object with string keys as well

### `Worksheet` API

Exported as XLSX.Worksheet.

#### `constructor(data, name, workbook)`

Accepts data either as an XLSX-style object (with a `!ref` property), or an array of arrays.

#### `getCell(address)`

Returns the cell object with that address.

#### `getRow(row)`

Returns a `Row` object.

#### `getCol(col)`

Returns a `Column` object.

#### `getRange(range)`

Returns a subset `Worksheet`. Keeps references to the original workbook and name.

#### `toJSON(opts)`

Exports the sheet as JSON. The default format is to use the first row as a header. To use column names as a header, pass `{header: 'A'}`. To use custom values, pass `{header: ['col1 header', 'col2 header']}`. The exported format is: `[{'col1 header': B1Value, 'col2 header': B2Value}, ...]`.

It automatically transforms values to their primitive formats. To disable this, pass `{raw: false}`.

#### `toArray(opts)`

Like `toJSON`, but returns an array of arrays instead of an array of objects. So: `[[A1Value, A2Value], [B1Value, B2Value], ...]`.

#### `toCSV(opts)`

Returns a CSV string of the worksheet. Default delimiter is a comma; default row ending is a newline. You can change this by passing `{delimiter: '\t', line: '\r\n'}` (for example).

### `Workbook` API

Not much. Only contains wrappers for `toJSON` and `toArray`. `toJSON` gives an object with the sheet names as keys; `toArray` gives an array of sheets. The values are the result of calling `toJSON` or `toArray` on the sheet object.

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
