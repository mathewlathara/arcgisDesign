
var yearFrom = 2000;
var yearTo = 2019;
var f1 = "Total Phosphorus (mg/L)";
var f2 = "Total Nitrogen (mg/L)";
var station = 'all';
var data_type = 'historical';
let des1 = document.getElementById('dec1');
let des2 = document.getElementById('dec2');
let standard_type = document.getElementById('standardType');
var station;
document.getElementById('getValue').disabled = true;
var CSV = "https://raw.githubusercontent.com/DishaCoder/CSV/main/Predict-Prescribe-Data.csv";
var dataColumns = ['Nitrogen Kjeldahl (mg/L)', 'Total Suspended Solids (mg/L)',
    'Nitrate (mg/L)', 'Conductivity (K)', 'Dissolved Oxygen (mg/L)', 'pH',
    'Total Nitrogen (mg/L)', 'Nitrite (mg/L)', 'Total Phosphorus (mg/L)',
    'Chloride (mg/L)', 'Natural Land 10m (ha)',
    'Anthropogenic Natural Land 10m (ha)', 'Anthropogenic Land 10m (ha)',
    'Station', 'Date', 'Year', 'Agricultural Land 250m (ha)',
    'Natural Land 250m (ha)', 'Latitude', 'Longitude', 'Month',
    'Population', 'Total Rain (mm) -14day Total',
    'Total Rain (mm) -1day Total', 'Total Rain (mm) -28day Total',
    'Total Rain (mm) -3day Total', 'Total Rain (mm) -56day Total',
    'Total Rain (mm) -7day Total', 'Total Rain (mm) 0day Total'];

var encode_features = {
    '1': 'Nitrogen Kjeldahl (mg/L)', '2': 'Total Suspended Solids (mg/L)',
    '3': 'Nitrate (mg/L)', '4': 'Conductivity (K)', '5': 'Dissolved Oxygen (mg/L)', '6': 'pH', '7':
        'Total Nitrogen (mg/L)', '8': 'Nitrite (mg/L)', '9': 'Total Phosphorus (mg/L)', '10':
        'Chloride (mg/L)', '11': 'Natural Land 10m (ha)', '12':
        'Anthropogenic Natural Land 10m (ha)', '13': 'Anthropogenic Land 10m (ha)', '14':
        'Station', '15': 'Date', '16': 'Year', '17': 'Agricultural Land 250m (ha)', '18':
        'Natural Land 250m (ha)', '19':
        'Population', '20': 'Total Rain (mm) -14day Total', '21':
        'Total Rain (mm) -1day Total', '22': 'Total Rain (mm) -28day Total', '23':
        'Total Rain (mm) -3day Total', '24': 'Total Rain (mm) -56day Total', '25':
        'Total Rain (mm) -7day Total', '26': 'Total Rain (mm) 0day Total'
}

function checkIfFilterButtonShouldenable() {
    var yearfromfrop = $("#yearFrom").val();
    var yeartooption = $("#yearTo").val();
    var standardoption = $("#standardType").val();
    var stationidfill = $("#station").val();
    var xaxisfill = $("#f1").val();
    var yaxisfill = $("#f2").val();

    if (yearfromfrop !== "" && yeartooption !== "" && standardoption !== "" && stationidfill !== "" && xaxisfill !== "" && yaxisfill !== "") {
        $("#getValue").prop("disabled", false);
    }
}

let standardType = ["ODWQS", "WHO"];

function standardDropdownBox() {
    var selectboxreturn = "<option value='' disabled selected>Select standard</option>";
    $(standardType).each((index, element) => {
        console.log(`current index : ${index} element : ${element}`);
        selectboxreturn += "<option value='" + element + "'>" + element + "</option>";
    });
    return selectboxreturn;
}

function yearFromDropDown() {
    let currentYear = new Date().getFullYear();
    let earliestYear = 2000;
    var selectboxreturn = "<option value='' selected disabled>Select from year</option>";
    while (currentYear >= earliestYear) {
        selectboxreturn += "<option value='" + currentYear + "'>" + currentYear + "</option>";
        currentYear -= 1;
    }
    return selectboxreturn;
}

// "From" year dropdown menu

$("#yearFrom").change(function () {
    console.log("yearFrom === ", $(this).val());
    globalThis.yearFrom = $(this).val();
    checkIfFilterButtonShouldenable();
});

// "To" year dropdown menu

function yearToDropDown() {
    let currentYear = 2020;
    let earliestYear = 2000;
    var selectboxreturn = "<option value='' selected disabled>Select to year</option>";
    while (currentYear >= earliestYear) {
        selectboxreturn += "<option value='" + currentYear + "'>" + currentYear + "</option>";
        currentYear -= 1;
    }
    return selectboxreturn;
}
$("#yearTo").change(function () {
    console.log("yearTo === ", $(this).val());
    globalThis.yearTo = $(this).val();
    checkIfFilterButtonShouldenable()
});

// Station selection
function stationIdSelectbox() {
    var selectboxreturn = "<option value='all' selected>All</option>";
    $(stations).each((index, element) => {
        // console.log(`current index : ${index} element : ${element}`)
        selectboxreturn += "<option value='" + element + "'>" + element + "</option>";
    });
    return selectboxreturn;
}
$("#station").change(function () {
    console.log("Station === ", $(this).val());
    globalThis.station = $(this).val();
    checkIfFilterButtonShouldenable()
});
// feature on X
function f1Selectbox() {
    var selectboxreturn = "<option value='' selected>Select Indicator 1</option>";
    console.log("dataColumns in f1: ", dataColumns);
    $(dataColumns).each((index, element) => {
        // console.log(`current index : ${index} element : ${element}`)
        selectboxreturn += "<option value='" + element + "'>" + element + "</option>";
    });
    return selectboxreturn;
}


$("#f1").change(function () {
    console.log("F1 === ", $(this).val());
    globalThis.f1 = $(this).val();
    checkIfFilterButtonShouldenable()
});
// feature on Y
function f2Selectbox() {
    console.log("this is changed");
    var selectboxreturn = "<option value='' selected>Select Indicator 2</option>";
    $(dataColumns).each((index, element) => {
        // console.log(`current index : ${index} element : ${element}`)
        selectboxreturn += "<option value='" + element + "'>" + element + "</option>";
    });
    return selectboxreturn;
}
$("#f2").change(function () {
    console.log("F2 === ", $(this).val());
    globalThis.f2 = $(this).val();
    checkIfFilterButtonShouldenable()
});
// const CSV = fetch("./static/admin-lte/dist/js/test.csv");
// const CSV = "D:\Lambton AIMT\Watershed Management system\django-adminlte3-master\django-adminlte3-master\data\data\df_top_10.csv";
// const CSV = "D:/Lambton AIMT/Watershed Management system/django-adminlte3-master/django-adminlte3-master/data/data/df_top_10.csv";
// const CSV = "https://raw.githubusercontent.com/chris3edwards3/exampledata/master/plotlyJS/line.csv";

// const CSV = "https://raw.githubusercontent.com/DishaCoder/CSV/main/Copy%20of%20merged_dataset_20210401.csv";
// const CSV = "adminlte3/static/admin-lte/dist/js/predicted_phosphorous.csv";


// setting options to feature dropdown
function selectFeature1() {
    let i = 0;
    // $('#f1').empty();
    // getData();
    // async function getData(){
    //     features_in_usecsv = [];
    //     const response = await fetch("static/admin-lte/assets/uploaded_data/user_uploaded_csv_file.csv");
    //     const data = await response.text();
    //     const table = data.split('\n');
    //     column_names = table[0];
    //     column_names = column_names.split(',');
    //     for(let i=0; i<column_names.length; i++){
    //         features_in_usecsv[i] = column_names[i].trimEnd(); 
    //     }
    //     dataColumns = features_in_usecsv;
    //     while (i < dataColumns.length) {
    //         let dateOption = document.createElement('option');
    //         dateOption.text = dataColumns[i];
    //         dateOption.value = dataColumns[i];
    //         f1.add(dateOption);
    //         i = i + 1;
    //     }
    //     i = 0;
    //     console.log("Feature", f1);
    // }
    dataColumns = ['Nitrogen_Kjeldahl',
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
    console.log("Feature", f1);
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

// check if year is present in custom data
function historicaldata() {
    console.log("Historical Data selected");
    if (document.getElementById('historicaldata').checked) {
        globalThis.data_type = "historical";
        globalThis.CSV = "https://raw.githubusercontent.com/DishaCoder/CSV/main/WMS_dataset.csv";
        document.getElementById('getValue').disabled = false;
    }
}
function customdata() {
    console.log("Custom Data selected");
    if (document.getElementById('customdata').checked) {
        // const CSV = "static/admin-lte/assets/uploaded_data/user_uploaded_csv_file.csv";
        globalThis.data_type = "custom";
        getData();
    }
}
async function getData() {
    console.log("in get data");
    let features_in_usecsv = [];
    const response = await fetch("static/admin-lte/dist/js/data/recently_predicted.csv");
    const data = await response.text();
    const table = data.split('\n');
    column_names = table[0];
    column_names = column_names.split(',');
    for (let i = 0; i < column_names.length; i++) {
        features_in_usecsv[i] = column_names[i].trimEnd();
    }
    console.log("custom data columns: ", features_in_usecsv);
    if (features_in_usecsv.indexOf("Year") == -1) {
        alert("Year is not present in uploaded CSV. Try uploading again with 'Year' as a column.");
        //location.reload();
    }
    else {
        console.log("in else part....");
        globalThis.CSV = "static/admin-lte/assets/uploaded_data/user_uploaded_csv_file.csv";
        document.getElementById('getValue').disabled = false;
        globalThis.dataColumns = features_in_usecsv;
        var f1selectbox = f1Selectbox();
        $("#f1").html(f1selectbox);
        var f2selectbox = f2Selectbox();
        $("#f2").html(f2selectbox);
    }

}
// fetch key by value
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

// fetching values from CSV file
function plotFromCSV() {

    if (yearFrom <= yearTo) {
        //const CSV = "https://raw.githubusercontent.com/DishaCoder/CSV/main/df_top_10.csv";
        const CSV = "https://raw.githubusercontent.com/DishaCoder/CSV/main/WMS_dataset.csv";
        // const CSV = "static/admin-lte/assets/uploaded_data/user_uploaded_csv_file.csv";
        console.log("csv selected: ", CSV);
        // window.location.href = '/filterDataForAnalysisPage/' + yearFrom + "/" + yearTo + "/" + f1 + "/" + f2 + "/" + station + "/" + data_type;

        //encode features
        console.log("before encoding === ", f1, f2);
        var f1_encoded = getKeyByValue(encode_features, f1);
        var f2_encoded = getKeyByValue(encode_features, f2);
        console.log("after encoding === ", f1_encoded, f2_encoded);

        $.ajax({
            type: 'get',
            // url: '/filterDataForAnalysisPage/' + yearFrom + "/" + yearTo,
            url: '/filterDataForAnalysisPage/' + yearFrom + "/" + yearTo + "/" + f1_encoded + "/" + f2_encoded + "/" + station + "/" + data_type,
            // url: '/filterDataForAnalysisPage',
            // data: {'yearFrom': yearFrom, 'yearTo': yearTo, "feature1":f1, 'feature2':f2, 'station':station, 'data_type':data_type},

            // contentType: false,
            // processData: false,
            // headers: { "X-CSRFToken": csrftoken },

            success: function (data) {
                console.log(data.graph1x);
                console.log(data.graph1y);
                console.log(data.graph2x);
                console.log(data.graph2y);
                console.log(data.error);
                var trace1 = {
                    x: data.graph1x,
                    y: data.graph1y,
                    type: 'scatter'
                };
                var trace2 = {
                    x: data.graph2x,
                    y: data.graph2y,
                    type: 'scatter'
                };
                var layout1 = {
                    title: 'Indicator 1: ' + f1,
                    yaxis: {
                        showline: true,
                        zeroline: true,
                        zerolinewidth: 2,
                        autotick: true,
                        // autorange: true,
                        title: f1,
                    },
                    xaxis: {
                        showline: true,
                        title: "Years",
                        tickmode: 'linear',
                        zeroline: true,
                        zerolinewidth: 2,
                    },
                };
                var layout2 = {
                    title: 'Indicator 2: ' + f2,
                    yaxis: {
                        showline: true,
                        zeroline: true,
                        zerolinewidth: 2,
                        autotick: true,
                        // autorange: true,
                        title: f2,
                    },
                    xaxis: {
                        showline: true,
                        title: "Years",
                        tickmode: 'linear',
                        zeroline: true,
                        zerolinewidth: 2,
                    },
                };
                var g1 = [trace1];
                var g2 = [trace2];
                Plotly.newPlot('graph1', g1, layout1);
                Plotly.newPlot('graph2', g2, layout2);
                document.getElementById('des1').innerHTML = data.description1;
                document.getElementById('des2').innerHTML = data.description2;
                document.getElementById('messageofdatasetgrowthinmissingyear').innerHTML = data.messageofdatasetgrowthinmissingyear;
            },
            error: function (error) {
                console.log("Error" + JSON.stringify(error));
            }
        });


        d3.csv(CSV, function (rows) {
            console.log(rows);
            console.log("Data Columns = ", rows.columns);
            processData(rows);
        });
    } else {
        alert("The From year cannot be greater than To year");
    }
}

// filtering data according to user input
function filterRows(row) {
    let feature1 = [];
    let feature2 = [];
    let years = [];
    console.log("year from:::", yearFrom);
    console.log("From filter to:", yearTo);
    console.log("f1 ::", f1);
    console.log("f2 ::", f2);
    console.log("station ::", station);
    console.log("row: ", row);
    document.getElementById("showfilteroption").innerHTML = "Showing results for year from " + yearFrom + " to " + yearTo + ". " + f1 + " as Indicator 1 and " + f2 + " as Indicator 2 for " + station + " station.";

    let i = 0;
    let j = 0;
    while (i < row.length) {
        if (row[i]["Year"] > yearFrom && row[i]["Year"] < yearTo && row[i]["STATION"] == station) {
            feature1[j] = row[i][f1];
            feature2[j] = row[i][f2];
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
    console.log("years===", years.length);

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

    if (f1 == "TotalPhosphorus") {
        makePlotlyP(x, y1);
    }
    else if (f1 == "pH") {
        makePlotlyPH(x, y1);
    }
    else if (f1 == "Nitrogen_Kjeldahl") {
        makePlotlyNK(x, y1);
    }
    else if (f1 == "TotalNitrogen") {
        makePlotlyN(x, y1);
    }
    else {
        makePlotlyxy1(x, y1);
    }
    makePlotlyxy2(x, y2);

    makePlotlyy1y2(y1, y2);

}

note = "\n NOTE: Ontario Drinking Water Quality Standard(ODWQS) and World Health Organization(WHO) standards have been followed.";
// For nitrogen
function makePlotlyN(x, y1) {
    console.log("Min max = ", Math.min.apply(Math, y1), Math.max.apply(Math, y1));
    // console.log("graph type = ", graphs_type.value);
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
        title: (f1).concat(" "),
        yaxis: {
            // autotick: true,
            // autorange: true,
            title: f1,
        },
        xaxis: {
            title: "Years",
            tickmode: 'linear'
        },

        shapes: [
            //Line Horizontal
            {
                type: 'line',
                x0: yearFrom,
                y0: 10,
                x1: yearTo,
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
            name: "PH",
            mode: "markers",
            // type:'bar',
            // bar: {
            //     color: "#387fba",
            //     width: 3
            // }
        },
    ];

    let layout = {
        title: (f1).concat(" "),
        yaxis: {
            // autotick: true,
            // autorange: true,
            title: f1,
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
                x0: yearFrom,
                y0: 6.5,
                x1: yearTo,
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
                x0: yearFrom,
                y0: 8.5,
                x1: yearTo,
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
    description = "The graph displays the pH amount noted in the selected years. pH level in the drinking water should be in the range of 6.5 to 8.5 as indicated in the graph.";
    document.getElementById('des1').innerHTML = description;
}
// nitrogen k
function makePlotlyNK(x, y1) {
    console.log("Min max = ", Math.min.apply(Math, y1), Math.max.apply(Math, y1));
    let traces = [
        {
            x: x,
            y: y1,
            name: "Nitrogen Kjeldahl",
            mode: "markers",
            // type:'bar',
            // bar: {
            //     color: "#387fba",
            //     width: 3
            // }
        },
    ];

    let layout = {
        title: (f1).concat(" "),
        yaxis: {
            // autotick: true,
            // autorange: true,
            title: f1,
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
        //       x0: yearFrom,
        //       y0: 6.5,
        //       x1: yearTo,
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
            name: "TotalPhosphorus",
            mode: "markers",
            // type:'bar',
            // bar: {
            //     color: "#387fba",
            //     width: 3
            // }
        },
    ];

    let layout = {
        title: (f1).concat(" "),
        yaxis: {
            // autotick: true,
            // autorange: true,
            title: f1,
        },
        xaxis: {
            title: "Years",
            tickmode: 'linear'
        },

        shapes: [
            //Line Horizontal
            {
                type: 'line',
                x0: yearFrom,
                y0: 0.5,
                x1: yearTo,
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
function makePlotlyxy1(x, y1) {
    let traces = [
        {
            x: x,
            y: y1,
            name: "",
            mode: "markers",
            // type: 'bar',
        },
    ];

    let layout = {
        title: (f1).concat(" "),
        yaxis: {
            title: f1,
            width: 2,

        },
        xaxis: {
            title: "Year",
            width: 2,
        },
    };
    shapes: [
        //Line Horizontal
        {
            type: 'line',
            x0: yearFrom,
            y0: 0.5,
            x1: yearTo,
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

    Plotly.newPlot("plot", traces, layout, config);
    description = "The graph is plotted for " + f1 + " and " + f2 + ". Hovering on the graph generates popup showing the values for two selected feature.";
    document.getElementById('des1').innerHTML = description;

}
// Fixed second graph
function makePlotlyxy2(x, y2) {
    let traces = [
        {
            x: x,
            y: y2,
            name: "",
            mode: "markers",
            // type: 'bar',
        },
    ];

    let layout = {
        title: (f2).concat(" "),
        yaxis: {
            title: f2,
            width: 2,

        },
        xaxis: {
            title: "Year",
            width: 2,
        },
    };
    shapes: [
        //Line Horizontal
        {
            type: 'line',
            x0: yearFrom,
            y0: 0.5,
            x1: yearTo,
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
    description = "The graph is plotted for " + f1 + " and " + f2 + ". Hovering on the graph generates popup showing the values for two selected feature." + note;
    document.getElementById('des2').innerHTML = description;

}
// Fixed second graph
function makePlotlyy1y2(y1, y2) {
    let traces = [
        {
            x: y1,
            y: y2,
            name: f1 + " vs " + f2,
            //mode: "markers",
            type: 'bar',
        },
    ];

    let layout = {
        title: "",
        yaxis: {
            title: f2,
            width: 2,

        },
        xaxis: {
            title: f1,
            width: 2,
        },
    };
    shapes: [
        //Line Horizontal
        {
            type: 'line',
            x0: yearFrom,
            y0: 0.5,
            x1: yearTo,
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

    Plotly.newPlot("plotInRow", traces, layout, config);
    description = "The graph is plotted for " + f1 + " and " + f2 + ". Hovering on the graph generates popup showing the values for two selected feature." + note;
    document.getElementById('des3').innerHTML = description;

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
        const val1 = String(f1); //feature 1
        const val2 = String(f2); //feature 2
        console.log("val1=" + val1);
        if (val1 == "TotalPhosphorus" || val2 == "TotalPhosphorus")
            var html_el = `<h6>Year: ${feature.properties.Year}</h6>
                <p>${val1}: ${feature.properties[val1]}<br>
                </p>
                <p>${val2}: ${feature.properties[val2]}<br>
                </p>`;
        else
            var html_el = `<h6>Year: ${feature.propert.csvies.Year}</h6>
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
        const val1 = String(f1); //feature 1
        const val2 = String(f2); //feature 2
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

function makePlotForNP(x, y) {
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
// for map========================================================================================================
$('#mapButton').on('click', function () {
    $.ajax({
        type: 'POST',
        url: '/plotMap',
        data: 1000,
        // contentType: false,
        // processData: false,
        headers: { "X-CSRFToken": csrftoken },

        success: function (data) {
            if (data) {
                htmlmapdev = "<div class='mt-2' >{{" + data.m + " | safe}}</div>";
                $('#map').html(htmlmapdiv);
            } else {
                console.log("error saving file");
            }
        },
        error: function (error) {
            console.log("Error" + JSON.stringify(error));
        }
    });
});

function mapSelectDropDown() {
    let currentYear = 2020;
    let earliestYear = 2000;
    var selectboxreturn = "<option value='' selected disabled>From year</option>";
    while (currentYear >= earliestYear) {
        selectboxreturn += "<option value='" + currentYear + "'>" + currentYear + "</option>";
        currentYear -= 1;
    }
    return selectboxreturn;
}

$("#mapyearselect").change(function () {
    console.log("mapyearselect === ", $(this).val());
    var mapYear = 2010;
    mapYear = $(this).val();
    $.ajax({
        type: 'get',
        url: '/getYearForAnalysisMap',
        data: { 'year': mapYear, 'data_type': data_type },
        // contentType: false,
        // processData: false,
        headers: { "X-CSRFToken": csrftoken },

        success: function (data) {
            console.log(data.status);
        },
        error: function (error) {
            console.log("Error" + JSON.stringify(error));
        }
    });
});


function senduserinfo() {
    console.log('senduserinfo');
    var name = 'disha';
    var age = '23';
    var url = '/trial?name=' + name + '&age=' + age;
    alert(url);
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    // request.onload = () =>{
    //     const flagmsg = request.responseText;
    //     console.log(flagmsg);
    // }
    request.send();
}