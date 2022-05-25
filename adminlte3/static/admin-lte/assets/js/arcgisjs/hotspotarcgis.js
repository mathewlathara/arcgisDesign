function hotspotfunction(filtertype, jsonpointfile, urllayer, jsonprocessedstring, yearselected) {
    require(["esri/config", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/widgets/LayerList", "esri/Graphic", "esri/layers/GraphicsLayer", "esri/widgets/Legend", "esri/widgets/Expand"], function (esriConfig, Map, MapView, FeatureLayer, LayerList, Graphic, GraphicsLayer, Legend, Expand) {

        esriConfig.apiKey = "AAPKfb2205b571aa464b8280e4e744e3bde7rK2eQbS-fVv05DUtFVJUqBVoJjMIQGIMHK7rqQR-In8y-qSZSmNtobECX3jGCzGG";

        const template2 = {
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

        const TRCALanduseRenderer2 = {
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

        const featureLayer2 = new FeatureLayer({
            url: "https://services.arcgis.com/t0XyVE44waBIPBFr/arcgis/rest/services/merged_land_cover/FeatureServer/0",
            // popupTemplate: template,
            renderer: TRCALanduseRenderer2,
            title: "TRCA Landuse base map"
        });

        /*-------------------------------- TRCA base land ----------------------------------------------------------------*/

        function TRCACustomRegion2(feature) {
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

        const TRCABASEtemplate2 = {
            // autocasts as new PopupTemplate()
            title: "TRCA region",
            outFields: ["UniqueID"],
            content: TRCACustomRegion2
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

        const TRCARenderer2 = {
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

        const TRCABaseLayer2 = new FeatureLayer({
            url: "https://services6.arcgis.com/1c4OxPOWDbePZZBO/arcgis/rest/services/newtrcaregion/FeatureServer/0",
            // popupTemplate: TRCABASEtemplate2,
            renderer: TRCARenderer2,
            opacity: 0.5,
            title: "TRCA region"
        });

        /* ---------------------------------- Durham region -------------------------------------------------*/

        const durhamAdditionalDetials2 = {
            title: "Show graphs",
            id: "detail-this",
            image: "/static/admin-lte/dist/img/adddetailsimg.png" // this section is for adding additional details button
        };

        function durhamregCustomRegion2(feature) {
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

        const durhamtemplate2 = {
            // autocasts as new PopupTemplate()
            title: "Durham region, Year:" + yearselected,
            outFields: ["UniqueID"],
            content: durhamregCustomRegion2,
            actions: [durhamAdditionalDetials2]
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

        const DurhamRenderer2 = {
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

        const DurhamLayer2 = new FeatureLayer({
            url: "https://services6.arcgis.com/1c4OxPOWDbePZZBO/arcgis/rest/services/durham_edited/FeatureServer/0",
            // popupTemplate: durhamtemplate2,
            renderer: DurhamRenderer2,
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
            field: "Landuse_Fu",
            uniqueValueInfos: [
                createFillSymbol("Agricultural", "#3282bd"),
                createFillSymbol("Institutional", "#EBF90D"),
                createFillSymbol("Roads", "#FB1102"),
                createFillSymbol("Lacustrine", "#05FBDC"),
                createFillSymbol("Airport", "#09F4F5"),
                createFillSymbol("Medium Density Residential", "#E5550E"),
                createFillSymbol("Forest", "#08B22B"),
                createFillSymbol("Commercial", "#766bb3"),
                createFillSymbol("Industrial", "#766bb3"),
                createFillSymbol("Meadow", "#48FB12"),
                createFillSymbol("Estate Residential", "#0752F6"),
                createFillSymbol("Mixed Commercial Entertainment", "#CB07F6")
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
        const induvidualLayers2 = new FeatureLayer({
            url: jsonprocessedstring,
            renderer: openspacerendererselected,
            // popupTemplate: template,
            // opacity: 0.9,
            title: "TRCA Landuse "+ yearselected +" demographics"
        });

        const ELCTRCARenderer2 = {
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

        const ELCTRCA2 = new FeatureLayer({
            url: "https://services.arcgis.com/t0XyVE44waBIPBFr/arcgis/rest/services/elc_trca_shp/FeatureServer/0",
            // popupTemplate: template,
            renderer: ELCTRCARenderer2,
            title: "ELC TRCA"
        });

        const CLOCALandcoverRender2 = {
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

        const CLOCALandcoverBase2 = new FeatureLayer({
            url: "https://services.arcgis.com/t0XyVE44waBIPBFr/arcgis/rest/services/cloca_land_covershp/FeatureServer/0",
            // popupTemplate: template,
            renderer: CLOCALandcoverRender2,
            title: "CLOCA Land cover"
        });

        const ECOLOGLANDClassificRender2 = {
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

        const ECOLOGLANDClassificBase2 = new FeatureLayer({
            url: "https://services.arcgis.com/t0XyVE44waBIPBFr/arcgis/rest/services/cloca_land_covershp/FeatureServer/0",
            // popupTemplate: template,
            renderer: ECOLOGLANDClassificRender2,
            title: "Ecological land classification"
        });

        const map2 = new Map({
            basemap: "gray-vector",
            layers: [featureLayer2, induvidualLayers2, ELCTRCA2, CLOCALandcoverBase2, ECOLOGLANDClassificBase2, DurhamLayer2]
        });

        const graphicsLayer = new GraphicsLayer({
            title: "Station points"
        });
        map2.add(graphicsLayer);

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

            const popupTemplate = {
                title: "{Name}",
                content: "{Description}",
            }

            const attributes = {
                Name: "Station name: " + jsonpointfile[i].station,
            }

            const pointGraphic = new Graphic({
                geometry: point,
                symbol: simpleMarkerSymbol,
                attributes: attributes,
                popupTemplate: popupTemplate
            });
            graphicsLayer.add(pointGraphic);
        }

        const view2 = new MapView({
            container: "hotspotDiv",
            map: map2,
            center: [-79.0911306275, 43.8299554612],
            zoom: 9
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

        view2.popup.on("trigger-action", (event) => {
            // Execute the measureThis() function if the measure-this action is clicked
            if (event.action.id === "detail-this") {
                let stationid = $("#stationid").val();
                $.ajax({
                    type: 'GET',
                    url: 'http://' + urllayer + '/arcgisMapSoilDetailsAPI/' + stationid + "/" + "{{yearselected}}",
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
                        alert("error");
                    }
                });
                // alert(stationid);
            }
        });

        const legend2 = new Legend({
            view: view2,
            style: "card"
        });

        const legendbgExpand = new Expand({
            view: view2,
            content: legend2
        });

        view2.ui.add(legendbgExpand, "bottom-left");

        view2.when(() => {
            const layerList = new LayerList({
                view: view2
            });

            const layerListdbgExpand = new Expand({
                view: view2,
                content: layerList
            });

            // Add widget to the top right corner of the view
            view2.ui.add(layerListdbgExpand, "top-right");
        });


        function openNav() {
            document.getElementById("mySidenav").style.width = "400px";
        }

        view2.popup.on("trigger-action", (event) => {
            // Execute the measureThis() function if the measure-this action is clicked
            if (event.action.id === "detail-this") {
                openNav();
            }
        });

    });
}