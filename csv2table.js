(function () {

    // Constructor method
    this.csv2table = function () {
        this.csvString = null;
        this.domElem;

        // Create options by extending defaults with the passed in arguments
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = arguments[0];
        }

    }

    csv2table.prototype.run = function () {
        return buildTable.call(this);
    }
    
    function getCSV() {
        try {
            var csvstring = this.options.csvString;
            return new Promise(function (resolve, reject) {
                resolve(csvstring);
            });
        } catch (err) {
            console.error(err);
        }
    }

    function isNotEmpty(row) {
        return row !== "";
    }

    // polyfill `.filter()` for ECMAScript <5.1
    if (!Array.prototype.filter) {
        Array.prototype.filter = function (f) {
            "use strict";
            var p = arguments[1];
            var o = Object(this);
            var len = o.length;
            for (var i = 0; i < len; i++) {
                if (i in o) {
                    var v = o[i];
                    f.call(p, v, i, o);
                }
            }

            return this;
        };
    }

    function buildTable() {
        var domelement = this.options.domElem;
        getCSV.call(this).then(function (response) {
            var allRows = response.split(/\r?\n|\r/).filter(isNotEmpty)
            .map(line => line.replace(/"/g, ''));
            
            var table = '<table>';
            for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
                if (singleRow === 0) {
                    table += '<thead>';
                    table += '<tr>';
                } else {
                    table += '<tr>';
                }
                var rowCells = allRows[singleRow].split(',');
                for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
                    if (singleRow === 0) {
                        table += '<th>';
                        table += rowCells[rowCell];
                        table += '</th>';
                    } else {
                        table += '<td>';
                        table += rowCells[rowCell];
                        table += '</td>';
                    }
                }
                if (singleRow === 0) {
                    table += '</tr>';
                    table += '</thead>';
                    table += '<tbody>';
                } else {
                    table += '</tr>';
                }
            }
            table += '</tbody>';
            table += '</table>';

            if (document.getElementById(domelement) != undefined) {
                document.getElementById(domelement).innerHTML += table;
            } else {
                document.body.innerHTML += table;
            }
        }, function (error) {
            console.error(error);
        });
    }
}());