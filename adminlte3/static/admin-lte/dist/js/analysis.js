let yearFrom = document.getElementById('yearFrom');
let yearTo = document.getElementById('yearTo');
let f1 = document.getElementById('f1');
let f2 = document.getElementById('f2');
let des1 = document.getElementById('dec1');
let des2 = document.getElementById('dec2');
let standard_type = document.getElementById('standardType');
let station_id = document.getElementById('station');


// "From" year dropdown menu
function yearFromSelect() {
    // document.getElementById('yearFrom').options.length = 0;

    let currentYear = new Date().getFullYear();
    let earliestYear = 2000;
    while (currentYear >= earliestYear) {
        let dateOption = document.createElement('option');
        dateOption.text = currentYear;
        dateOption.value = currentYear;
        yearFrom.add(dateOption);
        currentYear -= 1;
    }
    $("#yearFrom").change(function () {
        console.log($(this).val());
        var yearFrom = $(this).val();
        $.ajax({
            url: '/advanced',
            data: {
                'yearFrom': yearFrom
            },
            dataType: 'json',
            success: function (data) {
                if (data.is_taken) {
                    alert("A user with this username already exists.");
                }
            }
        });
    });
}

// "To" year dropdown menu
function yearToSelect() {
    // document.getElementById('yearTo').options.length = 0;

    let currentYear = 2020;//new Date().getFullYear();
    let earliestYear = (yearFrom.value);
    while (currentYear >= earliestYear) {
        let dateOption = document.createElement('option');
        dateOption.text = currentYear;
        dateOption.value = currentYear;
        yearTo.add(dateOption);
        currentYear -= 1;
    }
    $("#yearTo").change(function () {
        console.log($(this).val());
        var yearTo = $(this).val();
        $.ajax({
            url: '/advanced',
            data: {
                'yearTo': yearTo
            },
            dataType: 'json',
            success: function (data) {
                if (data.is_taken) {
                    alert("A user with this username already exists.");
                }
            }
        });

    });
}

function standardSelect() {
    // document.getElementById('standardType').options.length = 0;
    standardType = ["ODWQS", "WHO"];
    let i = 0;
    while (i < standardType.length) {
        let op = document.createElement('option');
        op.text = standardType[i];
        op.value = standardType[i];
        standard_type.add(op);
        i = i + 1;
    }
}
// Station selection
function stationSelect() {
    let i = 0;
    stations = [28, 29, 30, 85, 3007703502, 6010400102, 6010400802, 6010700202,
        6010800102, 6010800202, 6011100102, 6011100202, 6011100302,
        6011100502, 6011100602, 6011100702, 6011100802, 6011200302,
        6011200602, 6011600102, 6011600202, 6011600502, 6011600602, 988,
        1328, 1329, 1330, 17002113602, 17002113702, 600010258, 600010708,
        600013587, 6008000602, 6008000702, 6008200302, 6008300202,
        6008300402, 6008300902, 6008301202, 6008301802, 6008301902,
        6008310302, 6008310402, 6008500302, 6008500402, 6008501402,
        6009400202, 6009700302, 6009700702, 6009701102, 6009701302,
        6009701802, '6009701802', '6010400102', '6010400802', '6010402302',
        '6010402502', '6010402602', '6010402702', '6010402802',
        '6010402902', '6010403702', '6010700202', '7th Concession', '85',
        'Annadale', 'Brock Ridge', 'CC005', 'Central 1', 'Central 10',
        'Central 11', 'Central 12', 'Central 2', 'Central 3', 'Central 4',
        'Central 5', 'Central 6', 'Central 7', 'Central 8', 'Central 9',
        'East 1', 'East 10', 'East 11', 'East 12', 'East 2', 'East 3',
        'East 4', 'East 5', 'East 6', 'East 7', 'East 8', 'East 9',
        'FB003WM', 'PT001WM', 'Paulyn Park', 'Shoal Point', 'West 1',
        'West 10', 'West 11', 'West 12', 'West 2', 'West 3', 'West 4',
        'West 5', 'West 6', 'West 7', 'West 8', 'West 9'];
    while (i < stations.length) {
        let stationOption = document.createElement('option');
        stationOption.text = stations[i];
        stationOption.value = stations[i];
        station_id.add(stationOption);
        i = i + 1;
    }
    i = 0;
    console.log("Station", station_id.value);
}

// const CSV = fetch("./static/admin-lte/dist/js/test.csv");
// const CSV = "D:\Lambton AIMT\Watershed Management system\django-adminlte3-master\django-adminlte3-master\data\data\df_top_10.csv";
// const CSV = "D:/Lambton AIMT/Watershed Management system/django-adminlte3-master/django-adminlte3-master/data/data/df_top_10.csv";
// const CSV = "https://raw.githubusercontent.com/chris3edwards3/exampledata/master/plotlyJS/line.csv";

// const CSV = "https://raw.githubusercontent.com/DishaCoder/CSV/main/Copy%20of%20merged_dataset_20210401.csv";
// const CSV = "adminlte3/static/admin-lte/dist/js/predicted_phosphorous.csv";


// setting options to feature dropdown
function selectFeature1() {
    let i = 0;

    dataColumns = ['Year', 'Month', 'Nitrogen_Kjeldahl',
        'TotalSuspendedSolids', 'Nitrate', 'Conductivity', 'DissolvedOxygen',
        'pH', 'TotalNitrogen', 'Nitrite', 'TotalPhosphorus', 'Chloride',
        '10mLandCover_AgriculturalExtraction', '10mLandCover_Anthropogenic',
        '10mLandCover_AnthropogenicNatural', '10mLandCover_Natural', 'Latitude',
        'Longitude', '250mLandCover_Agricultural',
        '250mLandCover_Anthropogenic', '250mLandCover_Natural',
        'Total Rain (mm) 0day Total', 'Total Rain (mm) -7day Total',
        'Total Rain (mm) -56day Total', 'Total Rain (mm) -3day Total',
        'Total Rain (mm) -28day Total', 'Total Rain (mm) -1day Total',
        'Total Rain (mm) -14day Total'];
    while (i < dataColumns.length) {
        let dateOption = document.createElement('option');
        dateOption.text = dataColumns[i];
        dateOption.value = dataColumns[i];
        f1.add(dateOption);
        i = i + 1;
    }
    i = 0;
    console.log("Feature", f1.value);
}
function selectFeature2() {
    // dataColumns = ['pH','Month','Year','CensusYear','Total Rain (mm) 0day Total','Total Rain (mm) -3day Total','Total Rain (mm) -1day Total',
    //     'TotalNitrogen','Nitrogen_Kjeldahl','TotalPhosphorus'];
    let i = 0;
    while (i < dataColumns.length) {
        let dateOption = document.createElement('option');
        dateOption.text = dataColumns[i];
        dateOption.value = dataColumns[i];
        f2.add(dateOption);
        i = i + 1;
    }
    console.log("Feature", f2.value);
}
//function filterGraphType(){
//    graphsType = ["scatter", "bar"];
//    let i = 0;
//    while(i < graphsType.length){
//        let op = document.createElement('option');
//        op.text = graphsType[i];
//        op.value = graphsType[i];
//        graphs_type.add(op);
//        i = i+1;
//    }
//}

// fetching values from CSV file
function plotFromCSV() {
    //const CSV = "https://raw.githubusercontent.com/DishaCoder/CSV/main/df_top_10.csv";
    const CSV = "https://raw.githubusercontent.com/DishaCoder/CSV/main/WMS_dataset.csv";
    d3.csv(CSV, function (rows) {
        console.log(rows);
        console.log("Data Columns = ", rows.columns);
        processData(rows);
    });
}

// filtering data according to user input
function filterRows(row) {
    let feature1 = [];
    let feature2 = [];
    let years = [];

    console.log("From filter to:", yearTo.value);
    console.log("row: ", row[2]["TotalPhosphorus"]);
    let i = 0;
    let j = 0;
    while (i < row.length) {
        if (row[i]["Year"] > yearFrom.value && row[i]["Year"] < yearTo.value && row[i]["STATION"] == station_id.value) {
            feature1[j] = row[i][f1.value];
            feature2[j] = row[i][f2.value];
            years[j] = row[i]["Year"];

            j += 1;

        }
        i += 1;
    }
    console.log(feature1[2])
    return [years, feature1, feature2];
}


function processData(allRows) {
    console.log(allRows);
    let x = [];
    let y1 = [];
    let y2 = [];
    let row;

    //Filter years
    filteredData = filterRows(allRows);
    console.log("data length = ", filteredData.length);
    console.log("filterdata.years = ", filteredData[0]);
    years = filteredData[0];
    feature1 = filteredData[1];
    feature2 = filteredData[2];
    console.log("years", years.length);

    let i = 0;
    while (i < allRows.length) {
        y = years[i];
        p = feature1[i];
        n = feature2[i];
        x.push(y);   //(row["Year"][i]>yearTo && row["Year"][i]<yearFrom) ? row["Year"] : null);               //(row["Year"]); 
        y1.push(p);
        y2.push(n);
        i += 1;
    }

    console.log("X", x);
    console.log("Y1", y1);

    if (f1.value == "TotalPhosphorus") {
        makePlotlyP(x, y1);
    }
    else if (f1.value == "pH") {
        makePlotlyPH(x, y1);
    }
    else if (f1.value == "Nitrogen_Kjeldahl") {
        makePlotlyNK(x, y1);
    }
    else if (f1.value == "TotalNitrogen") {
        makePlotlyN(x, y1);
    }
    else {
        makePlotlyxy1(x, y1);
        makePlotlyxy2(x, y2);
    }
    makePlotlyy1y2(y1, y2);

}

note = "\n NOTE: Ontario Drinking Water Quality Standard(ODWQS) and World Health Organization(WHO) standards have been followed.";
// For nitrogen
function makePlotlyN(x, y1) {
    console.log("Min max = ", Math.min.apply(Math, y1), Math.max.apply(Math, y1));
    console.log("graph type = ", graphs_type.value);
    // if (graphs_type.value = null){
    //     graph =  "markers";
    // }
    // else {
    //     graph = graphs_type.value;
    // }
    let traces = [
        {
            x: x,
            y: y1,
            name: "Nitrogen",
            mode: "markers",
            // bar: {
            //     color: "#387fba",
            //     width: 3
            // }
        },
    ];

    let layout = {
        title: (f1.value).concat(" (mg/L)"),
        yaxis: {
            // autotick: true,
            // autorange: true,
            title: f1.value,
        },
        xaxis: {
            title: "Years",
            tickmode: 'linear'
        },

        shapes: [
            //Line Horizontal
            {
                type: 'line',
                x0: yearFrom.value,
                y0: 10,
                x1: yearTo.value,
                y1: 10,
                text: ["According to WHO & ODWQS"],
                line: {
                    color: 'rgb(220,20,60)',
                    width: 2,
                    //dash: 'dashdot'
                }

            },
        ]


    };

    //https://plot.ly/javascript/configuration-options/
    let config = {
        responsive: true,
        // staticPlot: true,
        // editable: true
    };

    Plotly.newPlot("plot", traces, layout, config);
    description = "The graph shows Total Nitrogen amount(on Y) recorded in mentioned year(on X). The red horizontal line indicates the threshold value for Nitrogen in drinking water of Lake Ontario is 10 mg/L.<br>The maximum acceptable concentration (MAC) for nitrate in drinking water is 45 mg/L. This is equivalent to 10 mg/L measured as nitrate-nitrogen. The MAC for nitrite in drinking water is 3 mg/L. This is equivalent to 1 mg/L measured as nitrite-nitrogen." + note;
    document.getElementById('des1').innerHTML = description;

}


// pH
function makePlotlyPH(x, y1) {
    console.log("Min max = ", Math.min.apply(Math, y1), Math.max.apply(Math, y1));
    let traces = [
        {
            x: x,
            y: y1,
            name: "Nitrogen",
            mode: "markers",
            // type:'bar',
            // bar: {
            //     color: "#387fba",
            //     width: 3
            // }
        },
    ];

    let layout = {
        title: (f1.value).concat(" (mg/L)"),
        yaxis: {
            // autotick: true,
            // autorange: true,
            title: f1.value,
        },
        xaxis: {
            title: "Years",
            tickmode: 'linear'
        },
        //Line Horizontal

        shapes: [
            //Line Horizontal
            {
                type: 'line',
                x0: yearFrom.value,
                y0: 6.5,
                x1: yearTo.value,
                y1: 6.5,
                text: ["According to WHO & ODWQS"],
                line: {
                    color: 'rgb(220,20,60)',
                    width: 2,
                    //dash: 'dashdot'
                }

            },
            {
                type: 'line',
                x0: yearFrom.value,
                y0: 8.5,
                x1: yearTo.value,
                y1: 8.5,
                text: ["According to WHO & ODWQS"],
                line: {
                    color: 'rgb(220,20,60)',
                    width: 2,
                    //dash: 'dashdot'
                }

            },
        ]


    };

    //https://plot.ly/javascript/configuration-options/
    let config = {
        responsive: true,
        // staticPlot: true,
        // editable: true
    };

    Plotly.newPlot("plot", traces, layout, config);
    description = "The graph displays the pH amount noted in the selected years. pH level in the drinking water should be in the range of 6.5 to 8.5 as indicated in the graph." + note;
    document.getElementById('des1').innerHTML = description;
}

// nitrogen k
function makePlotlyNK(x, y1) {
    console.log("Min max = ", Math.min.apply(Math, y1), Math.max.apply(Math, y1));
    let traces = [
        {
            x: x,
            y: y1,
            name: "Nitrogen",
            mode: "markers",
            // type:'bar',
            // bar: {
            //     color: "#387fba",
            //     width: 3
            // }
        },
    ];

    let layout = {
        title: (f1.value).concat(" (mg/L)"),
        yaxis: {
            // autotick: true,
            // autorange: true,
            title: f1.value,
        },
        xaxis: {
            title: "Years",
            tickmode: 'linear'
        },
        //Line Horizontal

        //  shapes: [
        // //Line Horizontal
        //     {
        //       type: 'line',
        //       x0: yearFrom.value,
        //       y0: 6.5,
        //       x1: yearTo.value,
        //       y1: 6.5,
        //       line: {
        //         color: 'rgb(220,20,60)',
        //         width: 1,
        //         //dash: 'dashdot'
        //       }

        //  ]


    };

    //https://plot.ly/javascript/configuration-options/
    let config = {
        responsive: true,
        // staticPlot: true,
        // editable: true
    };

    Plotly.newPlot("plot", traces, layout, config);
    description = "Total Kjeldahl Nitrogen (TKN) is the sum of organic nitrogen, ammonia, and ammonium in a water body. High TKN concentrations can indicate sewage and manure discharges are present in the water body." + note;
    document.getElementById('des1').innerHTML = description;

}

function makePlotlyP(x, y1) {
    console.log("Min max = ", Math.min.apply(Math, y1), Math.max.apply(Math, y1));
    let traces = [
        {
            x: x,
            y: y1,
            name: "Nitrogen",
            mode: "markers",
            // type:'bar',
            // bar: {
            //     color: "#387fba",
            //     width: 3
            // }
        },
    ];

    let layout = {
        title: (f1.value).concat(" (mg/L)"),
        yaxis: {
            // autotick: true,
            // autorange: true,
            title: f1.value,
        },
        xaxis: {
            title: "Years",
            tickmode: 'linear'
        },

        shapes: [
            //Line Horizontal
            {
                type: 'line',
                x0: yearFrom.value,
                y0: 0.5,
                x1: yearTo.value,
                y1: 0.5,
                line: {
                    color: 'rgb(220,20,60)',
                    width: 1,
                    //dash: 'dashdot'
                }

            },
        ]


    };

    //https://plot.ly/javascript/configuration-options/
    let config = {
        responsive: true,
        // staticPlot: true,
        // editable: true
    };

    Plotly.newPlot("plot", traces, layout, config);
    description = "The graph shows the amount of Phosphorus level in the water in selected years. The Phosphorus more than 0.5 mg/L is considered as dengerous for the health." + note;
    document.getElementById('des1').innerHTML = description;
}
// Fixed second graph
function makePlotlyxy2(x, y2) {
    let traces = [
        {
            x: x,
            y: y2,
            name: "Phosphorus",
            //mode: "markers",
            type: 'bar',
        },
    ];

    let layout = {
        title: (f2.value).concat(" (mg/L)"),
        yaxis: {
            title: f2.value,
            width: 2,

        },
        xaxis: {
            title: f1.value,
            width: 2,
        },
    };
    shapes: [
        //Line Horizontal
        {
            type: 'line',
            x0: yearFrom.value,
            y0: 0.5,
            x1: yearTo.value,
            y1: 0.5,
            line: {
                color: 'rgb(220,20,60)',
                width: 2,
                //dash: 'dashdot'
            }

        },
    ]


    //https://plot.ly/javascript/configuration-options/
    let config = {
        responsive: true,
        // staticPlot: true,
        // editable: true
    };

    Plotly.newPlot("plot2", traces, layout, config);
    description = "The graph is plotted for " + f1.value + " (on X) and " + f2.value + " (on Y). Hovering on the graph generates popup showing the values for two selected feature." + note;
    document.getElementById('des2').innerHTML = description;

}
// Fixed second graph
function makePlotlyy1y2(y1, y2) {
    let traces = [
        {
            x: y1,
            y: y2,
            name: "Phosphorus",
            //mode: "markers",
            type: 'bar',
        },
    ];

    let layout = {
        title: (f2.value).concat(" (mg/L)"),
        yaxis: {
            title: f2.value,
            width: 2,

        },
        xaxis: {
            title: f1.value,
            width: 2,
        },
    };
    shapes: [
        //Line Horizontal
        {
            type: 'line',
            x0: yearFrom.value,
            y0: 0.5,
            x1: yearTo.value,
            y1: 0.5,
            line: {
                color: 'rgb(220,20,60)',
                width: 2,
                //dash: 'dashdot'
            }

        },
    ]


    //https://plot.ly/javascript/configuration-options/
    let config = {
        responsive: true,
        // staticPlot: true,
        // editable: true
    };

    Plotly.newPlot("plot2", traces, layout, config);
    description = "The graph is plotted for " + f1.value + " (on X) and " + f2.value + " (on Y). Hovering on the graph generates popup showing the values for two selected feature." + note;
    document.getElementById('des2').innerHTML = description;

}

function showMap() {
    // // calling python fucntion
    // $.ajax({
    //     type: "POST",
    //     url: "/advanced",
    //     data: {}
    //   });
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGlzaGFjb2RlciIsImEiOiJja3dkcm80b2MwbTNiMnBvcDVicnRpMXYyIn0.UTc2vYCIeJVk4-GPCxHAkQ';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/dishacoder/ckxxoccar7lh714qezto6o17y',
        center: [-78.858447, 43.904752],
        zoom: 9
    });

    map.on('click', (event) => {
        const features = map.queryRenderedFeatures(event.point, {
            layers: ['df-top-10']
        });
        if (!features.length) {
            return;
        }
        const feature = features[0];
        const val1 = String(f1.value); //feature 1
        const val2 = String(f2.value); //feature 2
        console.log("val1=" + val1);
        if (val1 == "TotalPhosphorus" || val2 == "TotalPhosphorus")
            var html_el = `<h6>Year: ${feature.properties.Year}</h6>
                <p>${val1}: ${feature.properties[val1]}<br>
                </p>
                <p>${val2}: ${feature.properties[val2]}<br>
                </p>`;
        else
            var html_el = `<h6>Year: ${feature.properties.Year}</h6>
                <p>Phosphorus: ${feature.properties.TotalPhosphorus}<br>
                Nitrogen: ${feature.properties.TotalNitrogen}<br>
                Nitrogen_Kjeldahl: ${feature.properties.Nitrogen_Kjeldahl}<br>
                pH: ${feature.properties.pH}</p>`;
        var f = Object.keys(feature.properties)
        const popup = new mapboxgl.Popup({ offset: [0, -15] })
            .setLngLat(feature.geometry.coordinates)
            .setHTML(
                html_el
            )
            .addTo(map);
    });
}
// plotFromCSV();
function filter_station_on_map() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGlzaGFjb2RlciIsImEiOiJja3dkcm80b2MwbTNiMnBvcDVicnRpMXYyIn0.UTc2vYCIeJVk4-GPCxHAkQ';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/dishacoder/ckxxoccar7lh714qezto6o17y',
        center: [-78.858447, 43.904752],
        zoom: 9
    });

    map.on('click', (event) => {
        const features = map.queryRenderedFeatures(event.point, {
            layers: ['df-top-10']
        });
        if (!features.length) {
            return;
        }
        const feature = features[0];
        const val1 = String(f1.value); //feature 1
        const val2 = String(f2.value); //feature 2
        console.log("val1=" + val1);
        if (val1 == "TotalPhosphorus" || val2 == "TotalPhosphorus")
            var html_el = `<h6>Year: ${feature.properties.Year}</h6>
                <p>${val1}: ${feature.properties[val1]}<br>
                </p>
                <p>${val2}: ${feature.properties[val2]}<br>
                </p>`;
        else
            var html_el = `<h6>Year: ${feature.properties.Year}</h6>
                <p>Phosphorus: ${feature.properties.TotalPhosphorus}<br>
                Nitrogen: ${feature.properties.TotalNitrogen}<br>
                Nitrogen_Kjeldahl: ${feature.properties.Nitrogen_Kjeldahl}<br>
                pH: ${feature.properties.pH}</p>`;
        var f = Object.keys(feature.properties)
        const popup = new mapboxgl.Popup({ offset: [0, -15] })
            .setLngLat(feature.geometry.coordinates)
            .setHTML(
                html_el
            )
            .addTo(map);
    });

}

// folium map js

function launchMap() {
    const o2 = document.getElementsByName("o2").value;
    const depth = document.getElementsByName("depth").value;
    const n = document.getElementsByName("n").value;
    const nk = document.getElementsByName("nk").value;
    const tss = document.getElementsByName("tss").value;
    const p = document.getElementsByName("p").value;
    const feature_selected = [o2, depth, n, nk, tss, p];
    console.log(feature_selected);
}


function plot_np() {
    const CSV = "static/admin-lte/dist/js/data/high_n.csv";
    d3.csv(CSV, function (rows) {
        console.log(rows);
        console.log("Data Columns = ", rows.columns);
        processDataForNP(rows);

    });
}

function processDataForNP(rows) {
    console.log("process data:", rows);
    let i = 0;
    let x = [];
    let y = [];
    let x1 = [];
    let y1 = [];
    while (i < rows.length) {
        x1[i] = rows[i]["Chloride"];
        y1[i] = rows[i]["Phosphorus"];
        x.push(x1);   //(row["Year"][i]>yearTo && row["Year"][i]<yearFrom) ? row["Year"] : null);               //(row["Year"]); 
        y.push(y1);
        i += 1;
    }
    makePlotForNP(x, y);
}

function makePlotForNP(x, y){
    let traces = [
        {
            x: x,
            y: y,
            name: "Phosphorus",
            mode: "markers",
            // bar: {
            //     color: "#387fba",
            //     width: 3
            // }
        },
    ];

    let layout = {
        title: "Phosphorus",
        yaxis: {
            // autotick: true,
            // autorange: true,
            title: 'Phosphorus',
        },
        xaxis: {
            title: "row",
            tickmode: 'linear'
        },



    };

    //https://plot.ly/javascript/configuration-options/
    let config = {
        responsive: true,
        // staticPlot: true,
        // editable: true
    };

    Plotly.newPlot("plot_np", traces, layout, config);
    //description = "The graph shows Total Nitrogen amount(on Y) recorded in mentioned year(on X). The red horizontal line indicates the threshold value for Nitrogen in drinking water of Lake Ontario is 10 mg/L.<br>The maximum acceptable concentration (MAC) for nitrate in drinking water is 45 mg/L. This is equivalent to 10 mg/L measured as nitrate-nitrogen. The MAC for nitrite in drinking water is 3 mg/L. This is equivalent to 1 mg/L measured as nitrite-nitrogen." + note;
    //document.getElementById('des1').innerHTML = description;


}
// plot_np();