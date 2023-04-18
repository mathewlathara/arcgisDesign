function loadmapvalues(filtertype, jsonpointfile, urllayer, jsonprocessedstring, yearselected, trcadurhammapcombinedurl) {
    require(["esri/config", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/widgets/LayerList", "esri/Graphic", "esri/layers/GraphicsLayer", "esri/widgets/Legend", "esri/widgets/Expand", "esri/PopupTemplate"], function (esriConfig, Map, MapView, FeatureLayer, LayerList, Graphic, GraphicsLayer, Legend, Expand, PopupTemplate) {

        esriConfig.apiKey = "AAPKfb2205b571aa464b8280e4e744e3bde7rK2eQbS-fVv05DUtFVJUqBVoJjMIQGIMHK7rqQR-In8y-qSZSmNtobECX3jGCzGG";
        
        const template1 = {
            // autocasts as new PopupTemplate()
            title: "Demographics",
            content: [
                {
                    // It is also possible to set the fieldInfos outside of the content
                    // directly in the popupTemplate. If no fieldInfos is specifically set
                    // in the content, it defaults to whatever may be set within the popupTemplate.
                    type: "fields",
                    fieldInfos: [
                        {
                            fieldName: "Landuse_Fu",
                            label: "Land type"
                        },
                        {
                            fieldName: "layer",
                            label: "Layer",
                            format: {
                                digitSeparator: true,
                                places: 0
                            }
                        },
                        {
                            fieldName: "VegType",
                            label: "Vegitation type",
                            format: {
                                digitSeparator: true,
                                places: 0
                            }
                        },
                        {
                            fieldName: "Topographi",
                            label: "Topography",
                            format: {
                                digitSeparator: true,
                                places: 0
                            }
                        }
                    ]
                }
            ]
        };

        const TRCALanduseRenderer1 = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: "rgb(213, 210, 210)",
                outline: {
                    color: "rgb(0, 0, 0)",
                    width: 0.01
                }
            }
        };

        const featureLayer1 = new FeatureLayer({
            url: "https://services.arcgis.com/t0XyVE44waBIPBFr/arcgis/rest/services/merged_land_cover/FeatureServer/0",
            // popupTemplate: template,
            renderer: TRCALanduseRenderer1,
            title: "TRCA Landuse base map"
        });

        /*-------------------------------- TRCA base land ----------------------------------------------------------------*/

        function TRCACustomRegion1(feature) {
            var stationid = feature.graphic.attributes.UniqueID;
            const div = document.createElement("div");
            console.log("I am here ------>" + JSON.stringify(stationid));
            $.ajax({
                type: 'GET',
                url: 'http://' + urllayer + '/arcgisMapParametersDurhamRegion/' + stationid + "/" + yearselected,
                success: function (data) {
                    console.log(JSON.stringify(data));
                    div.innerHTML = "<p><u><b>Station ID: " + data.stationid + "</b></u></p><ul><li>Avg chloride: " + data.avgchloride + "</li><li>Avg population: " + data.avgpopulation + "</li><li>Avg phosphorus: " + data.avgphosphorus + "</li><li>Avg nitrogen: " + data.avgnitrogen + "</li></ul>";
                },
                error: function (error) {
                    console.log("error----->" + error);
                }
            });
            return div;
        }

        const TRCABASEtemplate1 = {
            // autocasts as new PopupTemplate()
            title: "TRCA region",
            outFields: ["UniqueID"],
            content: TRCACustomRegion1
            // content: [
            //     {
            //         // It is also possible to set the fieldInfos outside of the content
            //         // directly in the popupTemplate. If no fieldInfos is specifically set
            //         // in the content, it defaults to whatever may be set within the popupTemplate.
            //         type: "fields",
            //         fieldInfos: [
            //             {
            //                 fieldName: "layer",
            //                 label: "Layer",
            //                 format: {
            //                     digitSeparator: true,
            //                     places: 0
            //                 }
            //             },
            //         ]
            //     }
            // ]
        };

        const TRCARenderer1 = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: "rgb(79, 102, 68)",
                outline: {
                    color: "rgb(255, 255, 255)",
                    width: 0.5
                }
            }
        };

        const TRCABaseLayer1 = new FeatureLayer({
            url: "https://services6.arcgis.com/1c4OxPOWDbePZZBO/arcgis/rest/services/newtrcaregion/FeatureServer/0",
            popupTemplate: TRCABASEtemplate1,
            renderer: TRCARenderer1,
            opacity: 0.5,
            title: "TRCA region"
        });

        /* ---------------------------------- Durham region -------------------------------------------------*/

        const durhamAdditionalDetials1 = {
            title: "Show graphs",
            id: "detail-this",
            image: "/static/admin-lte/dist/img/adddetailsimg.png" // this section is for adding additional details button
        };

        function durhamregCustomRegion1(feature) {
            var stationid = feature.graphic.attributes.UniqueID;
            const div = document.createElement("div");
            console.log("I am here ------>" + JSON.stringify(stationid));
            $.ajax({
                type: 'GET',
                url: 'http://' + urllayer + '/arcgisMapParametersDurhamRegion/' + stationid + "/" + yearselected,
                success: function (data) {
                    console.log(JSON.stringify(data));
                    $("#stationid").val(stationid);
                    div.innerHTML = "<p><u><b>Station ID: " + data.stationid + "</b></u></p><ul><li>Avg chloride: " + data.avgchloride + "</li><li>Avg population: " + data.avgpopulation + "</li><li>Avg phosphorus: " + data.avgphosphorus + "</li><li>Avg nitrogen: " + data.avgnitrogen + "</li></ul>";
                },
                error: function (error) {
                    console.log("error----->" + error);
                }
            });
            return div;
        }

        const durhamtemplate1 = {
            // autocasts as new PopupTemplate()
            title: "Durham region, Year: " + yearselected,
            outFields: ["UniqueID"],
            content: durhamregCustomRegion1,
            actions: [durhamAdditionalDetials1]
            // content: [
            //     {
            //         // It is also possible to set the fieldInfos outside of the content
            //         // directly in the popupTemplate. If no fieldInfos is specifically set
            //         // in the content, it defaults to whatever may be set within the popupTemplate.
            //         type: "fields",
            //         fieldInfos: [
            //             {
            //                 fieldName: "layer",
            //                 label: "Layer",
            //                 format: {
            //                     digitSeparator: true,
            //                     places: 0
            //                 }
            //             },
            //         ]
            //     }
            // ]
        };

        const DurhamRenderer1 = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: "rgb(209, 213, 187)",
                outline: {
                    color: "rgb(0, 0, 0)",
                    width: 1
                }
            }
        };

        const DurhamLayer1 = new FeatureLayer({
            url: "https://services6.arcgis.com/1c4OxPOWDbePZZBO/arcgis/rest/services/durham_edited/FeatureServer/0",
            popupTemplate: durhamtemplate1,
            renderer: DurhamRenderer1,
            opacity: 0.3,
            title: "Durham region, Year: " + yearselected,
        });

        function createFillSymbol(value, color) {
            return {
                "value": value,
                "symbol": {
                    "color": color,
                    "type": "simple-fill",
                    "style": "solid",
                    "outline": {
                        color: "rgb(0, 0, 0)",
                        width: 0.1
                    }
                },
                "label": value
            };
        }

        const SpacesRenderer2017 = {
            type: "unique-value",
            field: "HABITAT",
            uniqueValueInfos: [
                createFillSymbol("Agricultural Land", "#3282bd"),
                createFillSymbol("Anthropogenic Land", "#A52A2A"),
                createFillSymbol("Natural Land", "#08B22B"),
                createFillSymbol("Surface Water Land", "#00FFFF"),
                createFillSymbol("Urban Land", "#EBF90D"),
                createFillSymbol("Rural Land", "#0752F6"),
                createFillSymbol("Other", "#FB1102"),
                createFillSymbol("Wetland", "#00FFFF"),
                createFillSymbol("Other Land", "#FB1102")
                // createFillSymbol("Institutional", "#EBF90D"),
                // createFillSymbol("Roads", "#FB1102"),
                // createFillSymbol("Lacustrine", "#05FBDC"),
                // createFillSymbol("Airport", "#09F4F5"),
                // createFillSymbol("Medium Density Residential", "#E5550E"),
                // createFillSymbol("Forest", "#08B22B"),
                // createFillSymbol("Commercial", "#766bb3"),
                // createFillSymbol("Industrial", "#766bb3"),
                // createFillSymbol("Meadow", "#48FB12"),
                // createFillSymbol("Estate Residential", "#0752F6"),
                // createFillSymbol("Mixed Commercial Entertainment", "#CB07F6")
            ],
            outline: {
                color: "rgb(0, 0, 2)",
                width: 0.1
            }
        };

        const SpaceRenderOtherThan2017 = {
            type: "unique-value",
            field: "HABITAT",
            uniqueValueInfos: [
                createFillSymbol("forest", "#08B22B"),
                createFillSymbol("wetland", "#EBF90D"),
                createFillSymbol("meadow", "#48FB12"),
                createFillSymbol("succ", "#766bb3")
            ],
            outline: {
                color: "rgb(0, 0, 2)",
                width: 0.1
            }
        };

        // Create the layer and set the renderer
        var yearselectedinputhidden = $("#yearselectedinputhidden").val();
        var openspacerendererselected = null
        // if (yearselectedinputhidden == "2017") {
        openspacerendererselected = SpacesRenderer2017;
        // } else {
        // openspacerendererselected = SpaceRenderOtherThan2017;
        // }
        const induvidualLayers1 = new FeatureLayer({
            url: jsonprocessedstring,
            renderer: openspacerendererselected,
            // popupTemplate: template,
            // opacity: 0.9,
            title: "TRCA jurisdiction"
        });

        const ELCTRCARenderer1 = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: "rgb(189, 184, 135)",
                outline: {
                    color: "rgb(0, 0, 0)",
                    width: 0.1
                }
            }
        };

        const ELCTRCA1 = new FeatureLayer({
            url: "https://services.arcgis.com/t0XyVE44waBIPBFr/arcgis/rest/services/elc_trca_shp/FeatureServer/0",
            // popupTemplate: template,
            renderer: ELCTRCARenderer1,
            title: "ELC TRCA"
        });

        const CLOCALandcoverRender1 = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: "rgb(189, 135, 158)",
                outline: {
                    color: "rgb(0, 0, 0)",
                    width: 0.1
                }
            }
        };

        const CLOCALandcoverBase1 = new FeatureLayer({
            url: "https://services.arcgis.com/t0XyVE44waBIPBFr/arcgis/rest/services/cloca_land_covershp/FeatureServer/0",
            // popupTemplate: template,
            renderer: CLOCALandcoverRender1,
            title: "CLOCA Land cover"
        });

        const ECOLOGLANDClassificRender1 = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: "rgb(218, 210, 220)",
                outline: {
                    color: "rgb(0, 0, 0)",
                    width: 0.1
                }
            }
        };

        const ECOLOGLANDClassificBase1 = new FeatureLayer({
            url: "https://services.arcgis.com/t0XyVE44waBIPBFr/arcgis/rest/services/cloca_land_covershp/FeatureServer/0",
            // popupTemplate: template,
            renderer: ECOLOGLANDClassificRender1,
            title: "Ecological land classification"
        });

        /* ----------------------------------   TRCA Durham region combined map --------------------------------------------*/

        const durhamTRCAAdditionalDetials1 = {
            title: "Show graphs",
            id: "detail-this",
            image: "/static/admin-lte/dist/img/adddetailsimg.png" // this section is for adding additional details button
        };

        function durhamregCustomRegion1(feature) {
            var stationid = feature.graphic.attributes.Station;
            const div = document.createElement("div");
            console.log("I am here ------>" + JSON.stringify(stationid));
            $("#stationid").val(stationid);
            div.innerHTML = "<table class='table'>" +
            "<thead><th></th><th></th></thead>" +
            "<tbody>" +
            "<tr><td>Station</td><td>" + feature.graphic.attributes.Station + "</td></tr>" +
            "<tr><td>Latitude</td><td>" + feature.graphic.attributes.Latitude.toFixed(5) + "</td></tr>" +
            "<tr><td>Longitude</td><td>" + feature.graphic.attributes.Longitude.toFixed(5) + "</td></tr>" +
            "<tr><td>Drainage basin (sq. KM)</td><td>" + feature.graphic.attributes.Drnge_bsn.toFixed(3) + " sq. KM" + "</td></tr>" +
            "<tr><td>Avg. chloride(mg/L)</td><td>" + feature.graphic.attributes.chl.toFixed(3) + " mg/L"+ "</td></tr>" +
            "<tr><td>Total phosphorus(mg/L)</td><td>" + feature.graphic.attributes.TP.toFixed(3) + " mg/L" + "</td></tr>" +
            "<tr><td>Total Nitrogen(mg/L)</td><td>" + feature.graphic.attributes.TN.toFixed(3) + " mg/L" + "</td></tr>" +
            "<tr><td>Total Population</td><td>" + feature.graphic.attributes.Population + "</td></tr>" +
            "</tbody>"
            "</table>";
            return div;
        }

        const TECADurhamRegionCombinedTemplate = {
            // autocasts as new PopupTemplate()
            title: "Region Demographics",
            outFields: ["*"],
            content: durhamregCustomRegion1,
            //     {
            //         // It is also possible to set the fieldInfos outside of the content
            //         // directly in the popupTemplate. If no fieldInfos is specifically set
            //         // in the content, it defaults to whatever may be set within the popupTemplate.
            //         type: "fields",
            //         fieldInfos: [
            //             {
            //                 fieldName: "Station",
            //                 label: "Station ID"
            //             },
            //             {
            //                 fieldName: "Latitude",
            //                 label: "Latitude",
            //             },
            //             {
            //                 fieldName: "Longitude",
            //                 label: "Longitude",
            //             },
            //             {
            //                 fieldName: "Drnge_bsn",
            //                 label: "Drainage basin",
            //                 format: {
            //                     places: 3,
            //                     digitSeparator: true
            //                 }
            //             },
            //             {
            //                 fieldName: "chl",
            //                 label: "Avg. chloride",
            //                 format: {
            //                     places: 3,
            //                     digitSeparator: true
            //                 }
            //             },
            //             {
            //                 fieldName: "TP",
            //                 label: "Total phosphorus",
            //                 format: {
            //                     places: 3,
            //                     digitSeparator: true
            //                 }
            //             },
            //             {
            //                 fieldName: "TN",
            //                 label: "Total Nitrogen",
            //                 format: {
            //                     places: 3,
            //                     digitSeparator: true
            //                 }
            //             },
            //             {
            //                 fieldName: "Population",
            //                 label: "Total Population",
            //             }
            //         ]
            //     }
            // ],
            actions: [durhamTRCAAdditionalDetials1]
        };

        const TRCADurhamregioncombined = new FeatureLayer({
            url: trcadurhammapcombinedurl,
            id : "TRCADurhamregioncombined",
            popupTemplate: TECADurhamRegionCombinedTemplate,
            renderer: DurhamRenderer1,
            title: "Data " + yearselected,
            opacity: 0.5
        });

        /* -------------------------------------------------------------------------------------------------------------- */

        /* -------------------------- Other landuse map combined of ELC, ELC-TRCA and CLOCA ------------------------------*/

        const OtherLayersCombined = new FeatureLayer({
            url: "https://services.arcgis.com/t0XyVE44waBIPBFr/ArcGIS/rest/services/Other/FeatureServer/0",
            renderer : openspacerendererselected,
            // popupTemplate: template,
            title: "CLOCA jurisdiction"
        });

        /* --------------------------------------------------------------------------------------------------------------*/

        const map1 = new Map({
            basemap: "gray-vector",
            layers: [induvidualLayers1, TRCADurhamregioncombined, OtherLayersCombined]
        });

        var ind = map1.layers.findIndex(layer => {
            return layer.id === "TRCADurhamregioncombined";
        });

        // console.log(ind);
        map1.layers.reorder(map1.layers.getItemAt(ind), map1.layers.length - 1);

        const graphicsLayer = new GraphicsLayer({
            title: "Monitoring stations",
        });
        map1.add(graphicsLayer);

        // console.log(JSON.stringify(jsonpointfile));

        for (var i = 0; i < jsonpointfile.length; i++) {
            console.log(jsonpointfile[i].stationiconlink);
            const simpleMarkerSymbol = {
                // type: "simple-marker",
                // color: [226, 119, 40],  // Orange
                // outline: {
                //     color: [255, 255, 255], // White
                //     width: 1
                // }
                type: "picture-marker",
                url: "/static/admin-lte/dist/img/" + jsonpointfile[i].stationiconlink,
                width: "25px",
                height: "60px"
            };
            // console.log(jsonpointfile[i])
            const point = { //Create a point
                type: "point",
                longitude: jsonpointfile[i].longitude,
                latitude: jsonpointfile[i].latitude
            };

            const popupTemplate = new PopupTemplate({
                title: "{Name}",
                content: "<ul><li>Avg phosphorus: " + jsonpointfile[i].phosphorusnumber + "</li><li>Avg nitrogen: " + jsonpointfile[i].nitrogernnumber + "</li><li>Latitude: " + jsonpointfile[i].latitude + "</li><li>Longitude: " + jsonpointfile[i].longitude + "</li></ul>"
            });

            popupTemplate.visibleElements = {
                closeButton: false
              };

            const attributes = {
                Name: "Station name: " + jsonpointfile[i].station,
            }

            const pointGraphic = new Graphic({
                geometry: point,
                symbol: simpleMarkerSymbol,
                attributes: attributes,
                popupTemplate: popupTemplate,
            });
            graphicsLayer.add(pointGraphic);
        }

        const view1 = new MapView({
            container: "viewDiv",
            map: map1,
            center: [-79.0911306275, 43.8299554612],
            zoom: 9,
            popup: {
                defaultPopupTemplateEnabled: false,
                dockEnabled: true,
                closeButton: false,
                dockOptions: {
                  buttonEnabled: true,
                  breakpoint: true
                },
                visibleElements: {
                    featureNavigation: false
                }
            }
        });

        function piechart(xvalues, yvalues, colorneeded, displaytext) {
            var xValues = xvalues;
            var yValues = yvalues;
            var barColors = colorneeded;

            new Chart("myChart", {
                type: "pie",
                data: {
                    labels: xValues,
                    datasets: [{
                        backgroundColor: barColors,
                        data: yValues
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: displaytext
                    }
                }
            });
        }

        view1.popup.on("trigger-action", (event) => {
            // Execute the measureThis() function if the measure-this action is clicked
            if (event.action.id === "detail-this") {
                $("#notdatafoundmodalrow").hide();
                $(".graphclass").show();
                var stationid = $("#stationid").val();
                let stationidspacereplaced = stationid.split(" ").join("");
                $.ajax({
                    type: 'GET',
                    url: 'http://' + urllayer + '/arcgisMapSoilDetailsAPI/' + stationidspacereplaced + "/" + yearselected,
                    success: function (data) {
                        if (data.status === "success") {
                            $("#stationdisplaymodalbox").html(stationid);
                            $('#demographicsGraphModal').modal('show');
                            // piechart(["CSS/with clay", "CSS/All together", "CSS/with sand", "CSS/with silt", "CSS/unknown"], [data.totalTCLAYwtd, data.totalTOTHERwtd, data.totalTSANDwtd, data.totalTSILTwtd, data.totalTUNKNOWNwtd], [ "#F2900B", "#F2D20B", "#DDFE04", "#A9F20A", "#D7DCCC"], "Soil/Sand data")
                            // var trace1 = {
                            //     x: [0, 1, 2, 3, 4, 5],
                            //     y: [1.5, 1, 1.3, 0.7, 0.8, 0.9],
                            //     type: 'scatter'
                            // };

                            // var trace2 = {
                            //     x: [0, 1, 2, 3, 4, 5],
                            //     y: [1, 0.5, 0.7, -1.2, 0.3, 0.4],
                            //     type: 'bar'
                            // };
                            $("#totalsamplingsitelatitudeid").html(data.latitude);
                            $("#totalsamplingsitelongitudeid").html(data.longitude);
                            $("#totalsqkmid").html(data.totalareasqkm[0] + " km");
                            if(data.totalareasqkm[0] == ""){
                                $(".graphclass").hide();
                                $("#notdatafoundmodalrow").show();
                            }
                            $("#drainagebasinid").html(data.totaldrainagebasinsqkm + " km");
                            $("#populationid").html(data.totalpopulation);
                            var listarrayvalue = [];
                            var rainfallbargraph = [];
                            for (var i = 0; i < data.linegraphreturnlist.length; i++) {
                                console.log(data.linegraphreturnlist[i]);
                                listarrayvalue.push(data.linegraphreturnlist[i]);
                                rainfallbargraph.push(data.bargraphRainfall[i]);
                            }

                            var xValues = [56, 28, 7, 3, 1];

                            new Chart("meantemperaturedivision", {
                                type: "line",
                                data: {
                                    labels: xValues,
                                    datasets: data.linegraphreturnlist
                                },
                                options: {
                                    scales: {
                                        yAxes: [{
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Integrted mean temperature(\xB0C)'
                                            }
                                        }],
                                        xAxes: [{
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Days preceding collection'
                                            }
                                        }]
                                    },
                                    legend: { display: false }
                                }
                            });

                            var layout = { barmode: 'group', xaxis: { title: 'Days preceding collection' }, yaxis: { title: 'Integrated precipitation' }, bargap: 0.01 };

                            Plotly.newPlot('meanmaxrainfalldivision', rainfallbargraph, layout);

                            var areawiseuseagevalues = [{
                                values: [data.totalagricultural[0], data.totalanthropogenic[0], data.totalnatural[0]],
                                labels: ['Agricultural', 'Urban', 'Natural'],
                                domain: { column: 0 },
                                name: 'GHG Emissions',
                                hoverinfo: 'label+percent+name',
                                hole: .4,
                                marker: {
                                    colors: ['#3282bd', '#E5550E', '#08B22B'],
                                    line: {
                                        color: 'white',
                                        width: 1
                                    }
                                },
                                type: 'pie'
                            }];
                            var areawiseusagelayout = {
                                title: "Land usage"
                            };
                            Plotly.newPlot("land-usechart", areawiseuseagevalues, areawiseusagelayout);

                            var claylayer = {
                                x: [data.totalTCLAYwtd[0]],
                                y: [''],
                                width: [0.8],
                                name: 'Clay',
                                orientation: 'h',
                                marker: {
                                    color: '#987D48',
                                    width: 0.01
                                },
                                type: 'bar'
                            };

                            var siltlayer = {
                                x: [data.totalTSILTwtd[0]],
                                y: [''],
                                width: [0.8],
                                name: 'Silt',
                                orientation: 'h',
                                marker: {
                                    color: '#BE9D3C',
                                    width: 0.01
                                },
                                type: 'bar'
                            };

                            var sandlayer = {
                                x: [data.totalTSANDwtd[0]],
                                y: [''],
                                width: [0.8],
                                name: 'Sand',
                                orientation: 'h',
                                marker: {
                                    color: '#EABA56',
                                    width: 0.01
                                },
                                type: 'bar'
                            };

                            var otherlayer = {
                                x: [data.totalTOTHERwtd[0]],
                                y: [''],
                                width: [0.8],
                                name: 'Other',
                                orientation: 'h',
                                marker: {
                                    color: '#E8CB91',
                                    width: 0.01
                                },
                                type: 'bar'
                            };

                            var unknownlayer = {
                                x: [data.totalTUNKNOWNwtd[0]],
                                y: [''],
                                width: [0.8],
                                name: 'Unknown',
                                orientation: 'h',
                                marker: {
                                    color: '#853A35',
                                    width: 0.01
                                },
                                type: 'bar'
                            };

                            var soilwisedata = [claylayer, siltlayer, sandlayer, otherlayer, unknownlayer];

                            var soilwiselayout = {
                                barmode: 'stack', title: "Soil layer data", xaxis: {
                                    autorange: true,
                                    showgrid: false,
                                    zeroline: false,
                                    showline: false,
                                    autotick: true,
                                    ticks: '',
                                    showticklabels: false
                                },
                                yaxis: {
                                    autorange: true,
                                    showgrid: false,
                                    zeroline: false,
                                    showline: false,
                                    autotick: true,
                                    ticks: '',
                                    showticklabels: false
                                }
                            };

                            Plotly.newPlot('soildatagraph', soilwisedata, soilwiselayout);

                            // var data = [trace1, trace2];

                        } else {
                            alert("Proper data not present");
                        }
                    },
                    error: function (error) {
                        console.log("error==----->" + error);
                    }
                });
                // alert(stationid);
            }
        });

        /* ---------------------- Commented the arcgis legend for the demographics attribute -----------------------*/
        
        // const legend1 = new Legend({
        //     view: view1,
        //     style: "card"
        // });

        // const legendbgExpand = new Expand({
        //     view: view1,
        //     content: legend1
        // });

        var searchelement = document.createElement('div');
        searchelement.className = "esri-icon-search esri-widget--button esri-widget esri-interactive";
        searchelement.addEventListener('click', function(evt){
        //   console.log("clicked"); 
          $('#searchYearOnMainMapHomeModal').modal('show');
        })
        view1.ui.add(searchelement, "top-right");

        // view1.ui.add(legendbgExpand, "bottom-left");

        view1.when(() => {
            const layerList = new LayerList({
                view: view1
            });

            const layerListdbgExpand = new Expand({
                view: view1,
                content: layerList
            });

            // Add widget to the top right corner of the view
            view1.ui.add(layerListdbgExpand, "top-right");
        });


        // function openNav() {
        //     document.getElementById("mySidenav").style.width = "400px";
        // }

        view1.popup.on("trigger-action", (event) => {
            // Execute the measureThis() function if the measure-this action is clicked
            if (event.action.id === "detail-this") {
                // openNav();
            }
        });

        view1.surface.addEventListener("wheel", function (event) {
            event.stopImmediatePropagation();
        }, true);

    });
}