const btnP = document.querySelector("#btnP");
const btnN = document.querySelector("#btnN");
const form = document.querySelector("#predictForm");

//const selected_model = document.querySelector("selectModel");

// btnP.addEventListener('click', e => {
//     console.log("p button clicked")
// });

// generate popovers
$(document).ready(function(){
    $('[data-toggle="popover"]').popover({
        placement : 'Left',
        trigger : 'hover'
    });
});

//make form 2 on predict page invisible when website loads
    // $(document).ready(function () {
    //     //Add your code here to run after fully page load
    //     document.getElementById("form_2").style.display = 'none';
    // });
function fileValidation() {
    var fileInput =
        document.getElementById('file');
    var filePath = fileInput.value;
    // Allowing file type
    var allowedExtensions =
        /(\.csv)$/i;
    if (!allowedExtensions.exec(filePath)) {
        alert('You can only upload CSV file');
        fileInput.value = '';
        return false;
    }
    else {
        return true;
    }
}

// customize select model with P N check button
function changeSelectModel(){
    
    if (document.getElementById('predictP').checked){
        document.getElementById("forN").style.display = "none";
        document.getElementById("forP").style.display = "block";
    }
    if (document.getElementById('predictN').checked){
        document.getElementById("forP").style.display = "none";
        document.getElementById("forN").style.display = "block";
    }
}

function selectModel() {
    console.log("Selected model called , Lakshmi");
    

    const random_forest = [0.01, 0.01, 96, 82];
    const cross_validation = [0.00, 0.05, 96.3, 70.8];
    const xgboost_1 = [0.00, 0.03, 94, 86.5];
    const xgboost_2 = [];
    console.log(selected_model)
    if ((document.getElementById('predictP').checked) && (document.getElementById('predictN').checked)) {
        alert("Sorry, you cannot predict nitrogen and phosphorus together because paramerter used while training model are different.");
    }
    else if (document.getElementById('predictP').checked) {
        document.getElementById('predictForm').action = "/upload";


        var selected_model = $("#selectModel").val();

        $("#selectModel").change(function () {
            console.log($(this).val());
            var select_model = $(this).val();
            $.ajax({
                url: '/models',
                data: {
                    'select_model': select_model
                },
                dataType: 'json',
                success: function (data) {
                    if (data.is_taken) {
                        alert("A user with this username already exists.");
                    }
                }
            });
        });
        if (selected_model == "Random Forest 16F") {
            console.log("RF if");
            model_config = "Mandatory features: 'TotalSuspendedSolids',	'Conductivity',	'DissolvedOxygen',	'pH', 'TotalNitrogen',	'Chloride',	'10mLandCover_AgriculturalExtraction',	'CensusYear',	'Total Rain (mm) 0day Total,'	'Total Rain (mm) -7day Total',	'Total Rain (mm) -56day Total',	'Total Rain (mm) -3day Total',	'Total Rain (mm) -28day Total',	'Total Rain (mm) -1day Total',	'Total Rain (mm) -14day Total',	'Month'"
            document.getElementById("info").innerHTML = model_config;
            document.getElementById("test_ac").innerHTML = "Test accuracy: 85.92%";

            document.getElementById("form_1").style.display = "block";
            document.getElementById("form_2").style.display = "none";
            $("#selectModel").change(function () {
                $.ajax({
                    url: '/upload',
                    data: {
                        'model': "Random Forest 16F"
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
        else if (selected_model == "XGBoost 5F") {
            model_config = "Mandatory features: 'Nitrite',	'Total Rain (mm) -1day Total', 'TotalNitrogen', 'Nitrogen_Kjeldahl', 'TotalSuspendedSolids'";
            document.getElementById("info").innerHTML = model_config;
            document.getElementById("test_ac").innerHTML = "Test accuracy: 86.68%";
            document.getElementById("form_1").style.display = "none";
            document.getElementById("form_2").style.display = "block";
            $("#selectModel").change(function () {
                console.log($(this).val());
                var select_model = $(this).val();
                $.ajax({
                    url: '/upload',
                    data: {
                        'model': "XGBoost 5F"
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
        else if (selected_model == "XGBoost 19F") {
            model_config = "Mandatory features: 'Nitrogen_Kjeldahl', 'TotalSuspendedSolids', 'Nitrate',	'Conductivity',	'DissolvedOxygen', 'pH', 'TotalNitrogen', 'Nitrite', 'Chloride', '10mLandCover_AgriculturalExtraction',	'CensusYear',	'Total Rain (mm) 0day Total,'	'Total Rain (mm) -7day Total',	'Total Rain (mm) -56day Total',	'Total Rain (mm) -3day Total',	'Total Rain (mm) -28day Total',	'Total Rain (mm) -1day Total',	'Total Rain (mm) -14day Total',	'Month'";
            document.getElementById("info").innerHTML = model_config;
            document.getElementById("test_ac").innerHTML = "Test accuracy: 88.05%";
            document.getElementById("form_1").style.display = "none";
            document.getElementById("form_2").style.display = "block";
            $.ajax({
                url: '/upload',
                data: {
                    'model': 'XGBoost 19F'
                },
                dataType: 'json',
                success: function (data) {
                    if (data.is_taken) {
                        alert("A user with this username already exists.");
                    }
                }
            });

            

        }
        else {
            if (selected_model == "Select Model") {
                document.getElementById("form_1").style.display = "block";
                document.getElementById("form_2").style.display = "none";
            }

        }
    }
    else if (document.getElementById('predictN').checked) {
        document.getElementById('predictForm').action = "/predictN";

        $("#selectModelN").change(function () {
            console.log($(this).val());
            var select_model = $(this).val();
            $.ajax({
                url: '/upload',
                data: {
                    'select_model': select_model
                },
                dataType: 'json',
                success: function (data) {
                    if (data.is_taken) {
                        alert("A user with this username already exists.");
                    }
                }
            });
        });
        $("#selectModelN").change(function () {
            console.log($(this).val());
            var select_model = $(this).val();
            $.ajax({
                url: '/predictN',
                data: {

                    'select_model': select_model
                },
                dataType: 'json',
                success: function (data) {
                    if (data.is_taken) {
                        alert("A user with this username already exists.");
                    }
                }
            });
        });
        var selected_model = $("#selectModelN").val();

        console.log("N is clicked model is ", selected_model);
        if (selected_model == "Random Forest") {
            console.log(" N RF if");
            model_config = "Mandatory features: Chloride,Nitrite,TotalPhosphorus,Nitrate";
            document.getElementById("info").innerHTML = model_config;
            
            document.getElementById("test_ac").innerHTML = "Test accuracy: 88.49%";

            document.getElementById("form_1").style.display = "block";
            document.getElementById("form_2").style.display = "none";
            $("#selectModel").change(function () {
                $.ajax({
                    url: '/upload',
                    data: {
                        'model': "Random Forest"
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
        else if (selected_model == "Cross Validation") {
            document.getElementById("form_1").style.display = "none";
            document.getElementById("form_2").style.display = "block";
            $("#selectModel").change(function () {
                console.log($(this).val());
                var select_model = $(this).val();
                $.ajax({
                    url: '/upload',
                    data: {
                        'model': "Cross Validation"
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.is_taken) {
                            alert("A user with this username already exists.");
                        }
                    }
                });
            });
            model_config = "Mandatory features: Chloride,Nitrite,TotalPhosphorus,Nitrate";
            document.getElementById("info").innerHTML = model_config;
            
            document.getElementById("test_ac").innerHTML = "Test accuracy: 86.83%";

        }
        
        else {
            if (selected_model == "Select Model") {
                document.getElementById("form_1").style.display = "block";
                document.getElementById("form_2").style.display = "none";
            }

        }

    }
    else {
        alert("Please check parameter you want to predict!");
    }

}
function setModel() {
    const select_model = $("#selectModel").val();
    console.log("setModel: ", select_model);

    $.ajax({
        url: '/upload',
        data: {
            'setmodel': select_model
        },
        dataType: 'json',
        success: function (data) {
            if (data.is_taken) {
                alert("A user with this username already exists.");
            }
        }
    });

}
function OnSubmitForm() {
    setModel();
    document.getElementById('predictForm').action = "/upload";
    document.getElementById('downloadForm').action = "/download_p";

    console.log("onsubmit form called");
    if (document.getElementById('predictP').checked) {
        document.getElementById('predictForm').action = "/upload";
        document.getElementById('downloadForm').action = "/download_p";

        console.log("p button is checked");
    }
    if (document.getElementById('predictN').checked){
        console.log("PredictN is clicked")
        document.getElementById('predictForm').action = "/predictN";
        //document.getElementById('downloadForm').action = "/download_n";

        console.log("N button is checked");
    }
}
function upload_file_model() {
    $.ajax({
        type: "GET",
        url: "/upload_file/",
        success: function (data) {
            alert(data);
            console.log(data);
        }
    });
}

function OnDownloadForm() {
    if (document.getElementById('predictP').checked) {
        document.getElementById('downloadForm').action = "/download_p";
    }
    else {
        document.getElementById('downloadForm').action = "/download_n";
    }
}
//======================================================map filters=============================

function filtero2() {
    const o2 = document.getElementsByName("o2").value;
    const depth = document.getElementsByName("depth").value;
    const n = document.getElementsByName("n").value;
    const nk = document.getElementsByName("nk").value;
    const tss = document.getElementsByName("tss").value;
    const p = document.getElementsByName("p").value;
    const feature_selected = [o2, depth, n, nk, tss, p];
    console.log(feature_selected);

    console.log($('input[name="o2"]:checked').val());
    console.log($('input[name="depth"]:checked').val());
    console.log($('input[name="n"]:checked').val());
    console.log($('input[name="nk"]:checked').val());
    console.log($('input[name="tss"]:checked').val());
    console.log($('input[name="p"]:checked').val());
    setTimeout(() => {
        console.log("Starting after timeout")
        $.ajax({
            url: '/map_ex',
            data: {
                'o2': $('input[name="o2"]:checked').val(),
                'depth': $('input[name="depth"]:checked').val(),
                'n': $('input[name="n"]:checked').val(),
                'nk': $('input[name="nk"]:checked').val(),
                'tss': $('input[name="tss"]:checked').val(),
                'p': $('input[name="p"]:checked').val(),

            }
        }, 10000);

    })

}
function filterComponents() {
    console.log($("#o2: checked").val);
    if (document.getElementById('o2').checked) {
        var o2 = 1;
        $("#o2").change(function () {
            console.log($(this).val());
            var checked_btn = $(this).val();
            $.ajax({
                url: '/map_ex',
                data: {
                    'checked': checked_btn
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
    else if (document.getElementById('depth').checked) {
        var depth = 1;
        $("#depth").change(function () {
            console.log($(this).val());
            var checked_btn = $(this).val();
            $.ajax({
                url: '/map_ex',
                data: {
                    'checked': checked_btn
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
    else if (document.getElementById('n').checked) {
        var n = 1;
        $("#n").change(function () {
            console.log($(this).val());
            var checked_btn = $(this).val();
            $.ajax({
                url: '/map_ex',
                data: {
                    'checked': checked_btn
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
    else if (document.getElementById('nk').checked) {
        var n = 1;
        $("#nk").change(function () {
            console.log($(this).val());
            var checked_btn = $(this).val();
            $.ajax({
                url: '/map_ex',
                data: {
                    'checked': checked_btn
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
    else if (document.getElementById('tss').checked) {
        var tss = 1;
        $("#tss").change(function () {
            console.log($(this).val());
            var checked_btn = $(this).val();
            $.ajax({
                url: '/map_ex',
                data: {
                    'checked': checked_btn
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
    else if (document.getElementById('p').checked) {
        var p = 1;
        $("#p").change(function () {
            console.log($(this).val());
            var checked_btn = $(this).val();
            $.ajax({
                url: '/map_ex',
                data: {
                    'checked': checked_btn
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
    else {
        o2 = 1;
        depth = 1;
        n = 1;
        tss = 1;
        p = 1;
        $("#o2").change(function () {
            console.log($(this).val());
            var checked_btn = $(this).val();
            $.ajax({
                url: '/map_ex',
                data: {
                    'checked': checked_btn
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

}
function changeElement() {
    document.getElementsByName('feature2')[0].placeholder = "Hey i am changed";
}
// function json_res(data){
//     data = JSON.parse(data);
//     console.log(data)
//     document.getElementById("m_error").innerHTML = data[0];
//     document.getElementById("r_error").innerHTML = data[1];
//     document.getElementById("train_ac").innerHTML = data[2];
//     document.getElementById("test_ac").innerHTML = data[3];
// }
// selected_model.addEventListener("click", json_res);

// trying leaflet


//     var mydata = JSON.parse(all_features);
//  console.log(mydata[0].LATITUDE);
//  console.log(mydata[0].LONGITUDE);
//  console.log(mydata[1].NITRITE);
//  console.log(mydata[1].NITRATE);
function fetchJSON() {
    const csv_file = "static/admin-lte/dist/js/data/all_features.json";
    // const csv_file = "static/admin-lte/dist/js/data/high_p.csv";
    let csv_data;
    d3.json(csv_file, function (json_data) {
        console.log(json_data);
        console.log("Data lats = ", json_data['LATITUDE'][0]);
        getData(json_data);
    });
}
function getData(json_data) {
    console.log("long:",json_data['Phosphorus, Total']);
console.log("length: ", Object.keys(json_data).length);
    launchLMap(json_data);
}
//fetchJSON();
function launchLMap(json_data) {

    
    // const marker = L.marker([json_data.LATITUDE[0], json_data.LONGITUDE[0]]).addTo(map_L);
    // toronto lat longs [43.651070, -79.347015]
    var map_L = L.map('map_L').setView([25.6586, -80.3568], 10, [baseLayer, heatmapLayer]);

    // Adding heatmap layer
    var testData = {
        max: 8,
        data: [{lat: 24.6408, lng:46.7728, count: 3},{lat: 50.75, lng:-1.55, count: 1},{lat: 52.6333, lng:1.75, count: 1},{lat: 48.15, lng:9.4667, count: 1},{lat: 52.35, lng:4.9167, count: 2},{lat: 60.8, lng:11.1, count: 1},{lat: 43.561, lng:-116.214, count: 1},{lat: 47.5036, lng:-94.685, count: 1},{lat: 42.1818, lng:-71.1962, count: 1},{lat: 42.0477, lng:-74.1227, count: 1},{lat: 40.0326, lng:-75.719, count: 1},{lat: 40.7128, lng:-73.2962, count: 2},{lat: 27.9003, lng:-82.3024, count: 1},{lat: 38.2085, lng:-85.6918, count: 1},{lat: 46.8159, lng:-100.706, count: 1},{lat: 30.5449, lng:-90.8083, count: 1},{lat: 44.735, lng:-89.61, count: 1},{lat: 41.4201, lng:-75.6485, count: 2},{lat: 39.4209, lng:-74.4977, count: 1},{lat: 39.7437, lng:-104.979, count: 1},{lat: 39.5593, lng:-105.006, count: 1},{lat: 45.2673, lng:-93.0196, count: 1},{lat: 41.1215, lng:-89.4635, count: 1},{lat: 43.4314, lng:-83.9784, count: 1},{lat: 43.7279, lng:-86.284, count: 1},{lat: 40.7168, lng:-73.9861, count: 1},{lat: 47.7294, lng:-116.757, count: 1},{lat: 47.7294, lng:-116.757, count: 2},{lat: 35.5498, lng:-118.917, count: 1},{lat: 34.1568, lng:-118.523, count: 1},{lat: 39.501, lng:-87.3919, count: 3},{lat: 33.5586, lng:-112.095, count: 1},{lat: 38.757, lng:-77.1487, count: 1},{lat: 33.223, lng:-117.107, count: 1},{lat: 30.2316, lng:-85.502, count: 1},{lat: 39.1703, lng:-75.5456, count: 8},{lat: 30.0041, lng:-95.2984, count: 2},{lat: 29.7755, lng:-95.4152, count: 1},{lat: 41.8014, lng:-87.6005, count: 1},{lat: 37.8754, lng:-121.687, count: 7},{lat: 38.4493, lng:-122.709, count: 1},{lat: 40.5494, lng:-89.6252, count: 1},{lat: 42.6105, lng:-71.2306, count: 1},{lat: 40.0973, lng:-85.671, count: 1},{lat: 40.3987, lng:-86.8642, count: 1},{lat: 40.4224, lng:-86.8031, count: 4},{lat: 47.2166, lng:-122.451, count: 1},{lat: 32.2369, lng:-110.956, count: 1},{lat: 41.3969, lng:-87.3274, count: 2},{lat: 41.7364, lng:-89.7043, count: 2},{lat: 42.3425, lng:-71.0677, count: 1},{lat: 33.8042, lng:-83.8893, count: 1},{lat: 36.6859, lng:-121.629, count: 2},{lat: 41.0957, lng:-80.5052, count: 1},{lat: 46.8841, lng:-123.995, count: 1},{lat: 40.2851, lng:-75.9523, count: 2},{lat: 42.4235, lng:-85.3992, count: 1},{lat: 39.7437, lng:-104.979, count: 2},{lat: 25.6586, lng:-80.3568, count: 7},{lat: 33.0975, lng:-80.1753, count: 1},{lat: 25.7615, lng:-80.2939, count: 1},{lat: 26.3739, lng:-80.1468, count: 1},{lat: 37.6454, lng:-84.8171, count: 1},{lat: 34.2321, lng:-77.8835, count: 1},{lat: 34.6774, lng:-82.928, count: 1},{lat: 39.9744, lng:-86.0779, count: 1},{lat: 35.6784, lng:-97.4944, count: 2},{lat: 33.5547, lng:-84.1872, count: 1},{lat: 27.2498, lng:-80.3797, count: 1},{lat: 41.4789, lng:-81.6473, count: 1},{lat: 41.813, lng:-87.7134, count: 1},{lat: 41.8917, lng:-87.9359, count: 1},{lat: 35.0911, lng:-89.651, count: 1},{lat: 32.6102, lng:-117.03, count: 1},{lat: 41.758, lng:-72.7444, count: 1},{lat: 39.8062, lng:-86.1407, count: 1},{lat: 41.872, lng:-88.1662, count: 1},{lat: 34.1404, lng:-81.3369, count: 1},{lat: 46.15, lng:-60.1667, count: 1},{lat: 36.0679, lng:-86.7194, count: 1},{lat: 43.45, lng:-80.5, count: 1},{lat: 44.3833, lng:-79.7, count: 1},{lat: 45.4167, lng:-75.7, count: 2},{lat: 43.75, lng:-79.2, count: 2},{lat: 45.2667, lng:-66.0667, count: 3},{lat: 42.9833, lng:-81.25, count: 2},{lat: 44.25, lng:-79.4667, count: 3},{lat: 45.2667, lng:-66.0667, count: 2},{lat: 34.3667, lng:-118.478, count: 3},{lat: 42.734, lng:-87.8211, count: 1},{lat: 39.9738, lng:-86.1765, count: 1},{lat: 33.7438, lng:-117.866, count: 1},{lat: 37.5741, lng:-122.321, count: 1},{lat: 42.2843, lng:-85.2293, count: 1},{lat: 34.6574, lng:-92.5295, count: 1},{lat: 41.4881, lng:-87.4424, count: 1},{lat: 25.72, lng:-80.2707, count: 1},{lat: 34.5873, lng:-118.245, count: 1},{lat: 35.8278, lng:-78.6421, count: 1}]
      };
    console.log(json_data);
    var baseLayer = L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=zkrxIWCyYW9xbPkW5wuj', {
        attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
    }).addTo(map_L);
    var cfg = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        "radius": 2,
        "maxOpacity": .8, 
        // scales the radius based on map zoom
        "scaleRadius": true, 
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries 
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": true,
        // which field name in your data represents the latitude - default "lat"
        latField: 'LATITUDE',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'LONGITUDE',
        // which field name in your data represents the data value - default "value"
        valueField: 'Phosphorus, Total'
    };

    var heatmapLayer = new HeatmapOverlay(cfg);

    // var map_L = new L.Map('map_L', {
    //     center: new L.LatLng(25.6586, -80.3568),
    //     zoom: 4,
    //     layers: [baseLayer, heatmapLayer]
    // });
    // var map_L = L.map('map_L').setView([43.651070, -79.347015], 10, [baseLayer, heatmapLayer]);

    heatmapLayer.setData({
        data: testData
    });

        // make accessible for debugging
    layer = heatmapLayer;
    
    
    let i=0;
    var greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

    var count = Object.keys(json_data).length;
    for (i = 0; i < count; i++) {
        // const marker = new L.marker([testData['data'][i]['lat'], testData['data'][i]['lng']],{icon: greenIcon})

        const marker = new L.marker([json_data['LATITUDE'][i], json_data['LONGITUDE'][i]],{icon: greenIcon})
        // .bindPopup("Phosphorus:" + String(json_data[i]['Phosphorus']) + String(json_data[i]['STATION']))
        .bindPopup(` <table>
        <tr>
          <th>Parameter </th>
          <th>Value </th>
        </tr>
        <tr>
        <tr>
          <td>Date</td>
          <td>`+String(json_data['DATE'][i])+`</td>
        </tr>
          <td>Station ID</td>
          <td>`+String(json_data['STATION'][i])+`</td>
          </tr>
          <tr>
          <td>Latitude</td>
          <td>`+String(json_data['LATITUDE'][i])+`</td>
          </tr>
          <tr>
          <td>Longitude</td>
          <td>`+String(json_data['LONGITUDE'][i])+`</td>
          </tr>
          <tr>
          <td>TotalPhosphorus</td>
          <td>`+String(json_data['Phosphorus, Total'][i])+`</td>
        </tr>
        <tr>
          <td>TotalNitrogen</td>
          <td>`+String(json_data['Phosphorus, Total'][i])+`</td>
        </tr><tr>
        <td>Phosphorus</td>
        <td>`+String(json_data['Phosphorus, Total'][i])+`</td>
      </tr>

      </table> `)

        .addTo(map_L);
        // console.log(json_data.LATITUDE[i]);
    }

}
//launchLMap();

