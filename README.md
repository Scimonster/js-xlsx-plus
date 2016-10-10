# js-xlsx-range
A wrapper for [js-xlsx](https://github.com/SheetJS/js-xlsx) with a simpler API. Can be used as a dropin.


## Changes

- `readFile` supports an asynchronous signature while retaining support for operating synchronously

- `read` returns a `Workbook` object; each sheet is a `Worksheet` object

- `utils` is duplicated as `util`; `utils` has extra function `cell_in_range`

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

### `Row` and `Column` object API

Both are subclasses of a `Data` class; neither are exported.

#### `get(address)`

Returns the cell object at the given row or column (depending on datatype) if `address` is a string. If `address` is a number, treat it as a numerical index.

#### `getValues()`

Returns an array of cell *values*.
