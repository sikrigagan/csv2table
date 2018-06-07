# csv2table
Component to generate HTML Table from CSV String

---

## Usage:

### Type 1: Using Already Created Table

```
var genTable = new csv2table({
  csvString: "csvString",
  domElem: "tableID"
});

genTable.run();
```
> Specify csvstring in variable `csvString`.
> Specify ID of table/div element present on web page in variable `domElem`.



### Type 2: Without using Already Created Table

```
var genTable = new csv2table({
  csvString: "csvString"
});

genTable.run();
```
> Specify csvstring in variable `csvString`. This method will add a table element to existing DOM tree of web page.
