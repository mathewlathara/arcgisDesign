import TableCsv from "./TableCsv.js";
// import * as fs from 'fs';

//var fileName = "D:\Lambton AIMT\Watershed Management system\django-adminlte3-master\django-adminlte3-master\pred_alt.csv";
//const file = fs.readFileSync(fileName, {encoding: 'binary'});
// const btn = document.getElementById("#showCsv");


const tableRoot = document.querySelector("#csvRoot");
const csvFileInput = document.querySelector("#csvFileInput");
const tableCsv = new TableCsv(tableRoot);
const l = localStorage.getItem(csvFileInput.file[0]);

// read data and pass into papaparse
csvFileInput.addEventListener("change", e => {
    console.log(l);
    Papa.parse(csvFileInput.files[0],{
        delimiter: ",",
        skipEmptyLines: true,
        complete: results => {
            tableCsv.update(results.data.slice(1), results.data[0])

        }
    });
});


// btn.addEventListener("click", e => {
//     console.log(file);
//     Papa.parse(file,{
//         delimiter: ",",
//         skipEmptyLines: true,
//         complete: results => {
//             tableCsv.update(results.data.slice(1), results.data[0])
//             console.log('parsed file...');
//         }
//     });
// });



// For advanced page
//select year dropdown js

