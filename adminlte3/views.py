import mimetypes
import os

import branca
import ee
import numpy as np
import pandas as pd
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse
import pickle
import json
from django.shortcuts import render
from django.utils.datastructures import MultiValueDictKeyError
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import xgboost
from pandas.core.frame import DataFrame
from django.http import JsonResponse
import re
import folium
import geopandas as gpd
from folium.plugins import HeatMap

import shapefile


# Create your views here.
def index(request):
    return render(request, "adminlte/index.html")


# This file is supposed to be edited in terms of making changes on main dashboard

def dashboard_m(request):
    reading_csv(request)
    censusYear, totalPhosh, nitrateNitrite = censusPieChart(request)
    print(censusYear, totalPhosh)
    pie_phos_val = {'labels': censusYear, 'data': totalPhosh}

    return render(request, 'adminlte/dashboard.html', pie_phos_val)


def yearlyBarChart(request):
    Year, totalPhosh, nitrateNitrite = yearlyData(request)
    bar_phos_val = {'labels': Year, 'data': totalPhosh}
    bar_nitrate_val = {'labels': Year, 'data': nitrateNitrite}
    return JsonResponse(bar_phos_val)  # render(request, 'adminlte/dashboard.html', bar_phos_val)


def censusBarChart(request):
    censusYear, totalPhosh, nitrateNitrite = censusData(request)
    bar_phos_val = {'labels': censusYear, 'data': totalPhosh}
    bar_nitrate_val = {'labels': censusYear, 'data': nitrateNitrite}
    return JsonResponse(bar_phos_val)  # render(request, 'adminlte/dashboard.html', bar_phos_val)


def censusPieChart(request):
    censusYear, totalPhosh, nitrateNitrite = censusData(request)
    pie_phos_val = {'labels': censusYear, 'data': totalPhosh}
    bar_nitrate_val = {'labels': censusYear, 'data': nitrateNitrite}
    return censusYear, totalPhosh, nitrateNitrite  # render(request, 'adminlte/dashboard.html', pie_phos_val)#JsonResponse(pie_phos_val)#


def reading_csv(request):
    global df
    df = pd.read_csv(open('data/data/merged_dataset.csv', 'rt', encoding='utf8'))


def yearlyData(request):
    Year = []
    phosphorous = []
    nitrateNitrite = []

    global df
    df = pd.read_csv(open('data/data/merged_dataset.csv', 'rt', encoding='utf8'))
    df_ = df.sort_values(by=['Year'])
    df_ = df_.groupby('Year').mean().reset_index()
    df_ = DataFrame(df_)

    for index, row in df_.iterrows():
        phosphorous.append(row['TotalPhosphorus'])
        Year.append(row['Year'])
        nitrateNitrite.append(row['NitrateNitrite'])

    return Year, phosphorous, nitrateNitrite


def censusData(request):
    censusYear = []
    phosphorous = []
    nitrateNitrite = []

    global df
    df_ = df.sort_values(by=['CensusYear'])
    df_ = df_.groupby('CensusYear').mean().reset_index()
    df_ = DataFrame(df_)

    for index, row in df_.iterrows():
        phosphorous.append(row['TotalPhosphorus'])
        censusYear.append(row['CensusYear'])
        nitrateNitrite.append(row['NitrateNitrite'])

    return censusYear, phosphorous, nitrateNitrite


def predictedYearlyBarChart(request):
    """This method is responsible for returning data to draw graph for predicted phosphorus."""
    Year, totalPhosh, nitrogen = predictedPhosphorus(request)
    bar_phos_val = {'labels': Year, 'data': totalPhosh}
    bar_nitrate_val = {'labels': Year, 'data': nitrogen}
    return JsonResponse(bar_phos_val)


def predictedYearlyNitrogen(request):
    """This method is responsible for returning data to draw graph for predicted phosphorus."""
    Year, totalPhosh, nitrogen = predictedPhosphorus(request)
    bar_phos_val = {'labels': Year, 'data': totalPhosh}
    bar_nitrate_val = {'labels': Year, 'data': nitrogen}
    return JsonResponse(bar_nitrate_val)


def predictedPhosphorus(request):
    """This method is responsible for calculating data to draw graph for predicted phosphorus."""
    Year = []
    phosphorous = []
    nitrogen = []

    global df
    df = pd.read_csv(open('pred_alt.csv', 'rt', encoding='utf8'))
    df_ = df.sort_values(by=['Year'])
    df_ = df_.groupby('Year').mean().reset_index()
    df_ = DataFrame(df_)

    for index, row in df_.iterrows():
        phosphorous.append(row['Phosphorus'])
        Year.append(row['Year'])
        nitrogen.append(row['TotalNitrogen'])

    return Year, phosphorous, nitrogen


# -----------------------------------------------------------------------------------------------------------------

def getModel():
    # model = pickle.load(open('ml_models/forest_reg.sav', 'rb'))
    accuracy = pickle.load(open('ml_models/accuracy.sav', 'rb'))
    return accuracy


selectedModel = ""


def result(request):
    # print("result called")
    # reading_csv(request)
    # censusYear, totalPhosh, nitrateNitrite = censusPieChart(request)
    # print(censusYear, totalPhosh)
    # pie_phos_val = {'labels': censusYear, 'data': totalPhosh}

    if request.method == 'GET':
        print("Its get method")
        global selectedModel
        selectedModel = request.GET.get("select_model")
        print("Selected model(select_model)", selectedModel)
        # print("Model: ",request.GET.get("model"))

        ac = getModel()
        random_forest = [0.01, 0.01, 96, 82]

        cross_validation = [0.00, 0.05, 96.3, 70.8]

        xgboost_1 = [0.00, 0.03, 94, 86.5]

        xgboost_2 = []

        model_info = {'ac1': round(random_forest[0], 2), 'ac2': round(random_forest[1], 2),
                      'ac3': round(random_forest[2], 2), 'ac4': random_forest[3]}
        send_info = {}
        if selectedModel == "Random Forest":
            print("rf if")
            print(request.GET.get("model"))
            send_info = {'ac1': round(random_forest[0], 2), 'ac2': round(random_forest[1], 2),
                         'ac3': round(random_forest[2], 2), 'ac4': random_forest[3]}
            return render(request, 'adminlte/models.html', send_info)

        elif selectedModel == "Cross Validation":
            print("inside cv")
            print(request.GET.get("model"))
            send_info = {'ac1': cross_validation[0], 'ac2': cross_validation[1], 'ac3': cross_validation[2],
                         'ac4': cross_validation[2]}
            return render(request, 'adminlte/models.html', send_info)

        elif selectedModel == "XGBoost I":
            print("inside xg 1")
            send_info = {'ac1': xgboost_1[0], 'ac2': xgboost_1[1], 'ac3': xgboost_1[2], 'ac4': xgboost_1[2]}
            return render(request, 'adminlte/models.html', send_info)

        # return JsonResponse(json.dumps(model_info))
        else:
            return render(request, 'adminlte/models.html', model_info)
    else:
        print("Its post method")
        print("model", request.POST.get("model"))
        # random_forest = [0.01, 0.01, 96, 82]
        #
        # send_info = {'ac1': round(random_forest[0], 2), 'ac2': round(random_forest[1], 2), 'ac3': round(random_forest[2], 2), 'ac4': random_forest[3]}

        parameters, phosphorus = predictP(request)
        ac = getModel()
        return render(request, 'adminlte/models.html', {'ans': parameters, 'p': str(
            round(phosphorus[0], 2))})  # , {'ac1': round(ac[0], 2), 'ac2': round(ac[1], 2),
        # 'ac3': round(ac[2], 2), 'ac4': ac[3],
        #  'p': str(round(phosphorus[0], 2))})


def predictP(request):
    if request.POST.get('feature6'):
        if (request.POST.get('feature1') == None):
            ph, month, year, cyear, rain0, rainm3, rainm1, nitrogen, nk = 0, 0, 0, 0, 0, 0, 0, 0, 0
        else:
            print("model", request.POST.get('model'))
            ph = float(request.POST.get('feature1'))
            month = int(request.POST.get('feature2'))
            year = int(request.POST.get('feature3'))
            cyear = int(request.POST.get('feature4'))
            rain0 = float(request.POST.get('feature5'))
            rainm3 = float(request.POST.get('feature6'))
            rainm1 = float(request.POST.get('feature7'))
            nitrogen = float(request.POST.get('feature8'))
            nk = float(request.POST.get('feature9'))
            # converting data into 2d array
        parameters = [[ph, month, year, cyear, rain0, rainm3, rainm1, nitrogen, nk]]
        param_dict = {}
        print(parameters)
        model = pickle.load(open('ml_models/forest_reg.sav', 'rb'))
        phosphorus = model.predict(parameters)
        print(phosphorus[0])
        return parameters, phosphorus
    else:
        if (request.POST.get('feature1') == None):
            o2, depth, n, nk, tss = 0, 0, 0, 0, 0
        else:
            print("model", request.POST.get('model'))
            o2 = float(request.POST.get('feature1'))
            depth = float(request.POST.get('feature2'))
            n = float(request.POST.get('feature3'))
            nk = float(request.POST.get('feature4'))
            tss = float(request.POST.get('feature5'))

            # converting data into 2d array
        parameters = [[o2, depth, n, nk, tss]]
        print(parameters)
        model = pickle.load(open('ml_models/TotalPhosphorous_XG_87.sav', 'rb'))
        phosphorus = model.predict(parameters)
        print(phosphorus[0])
        return parameters, phosphorus


def upload_file(request):
    context = {}
    try:
        if request.method == 'POST':
            # if fs.exists(name):
            #     os.remove(os.path.join(settings.MEDIA_ROOT, name))
            uploaded_file = request.FILES['csv_file']
            fs = FileSystemStorage()
            fs.delete('data/user_uploaded_data/user_uploaded_csv_file.csv')
            name = fs.save('data/user_uploaded_data/user_uploaded_csv_file.csv', uploaded_file)
            print("Filename: ", name)
            print("File uploaded")
            context['url'] = fs.url(name)
            uploaded_csv = pd.read_csv(name)
            csv_shape = uploaded_csv.shape
            null_values = uploaded_csv.isna().sum().sum()

            # divide columns and predict phosphorus
            # df_p = uploaded_csv[[	'Nitrogen_Kjeldahl',	'TotalSuspendedSolids',	'Nitrate',	'Conductivity',	'DissolvedOxygen',	'pH',	'TotalNitrogen',	'Nitrite',	'Chloride',	'10mLandCover_AgriculturalExtraction',	'CensusYear',	'Total Rain (mm) 0day Total',	'Total Rain (mm) -7day Total',	'Total Rain (mm) -56day Total',	'Total Rain (mm) -3day Total',	'Total Rain (mm) -28day Total',	'Total Rain (mm) -1day Total',	'Total Rain (mm) -14day Total',	'Month']].copy()
            # model = pickle.load(open('ml_models/TotalPhosphorous-XG-19F.sav', 'rb'))

            df_p = uploaded_csv[['Oxygen, Dissolved (% Saturation)', 'Depth, Sample (Field)', 'Nitrite',
                                 'Nitrogen, Total Kjeldahl (TKN)', 'Solids, Suspended (TSS)']].copy()
            df_p = df_p.dropna()
            df_p.to_csv("df_p.csv", index=False)
            model = pickle.load(open('ml_models/TotalPhosphorous_XG_87.sav', 'rb'))
            phosphorus = np.round(model.predict(df_p), 2)
            phosphorus = pd.DataFrame(phosphorus)
            phosphorus.columns = ['Phosphorus']
            phosphorus_pred_csv = pd.concat([df_p, phosphorus.reindex(df_p.index)], axis=1)
            phosphorus_pred_csv.to_csv("adminlte3/static/admin-lte/dist/js/data/predicted_phosphorus_only.csv",
                                       index=False)
            print("Phosphorus predicted")

            # Predict Nitrogen
            df_n = uploaded_csv[['Chloride, Total', 'Nitrogen; nitrite', 'Nitrate']].copy()
            df_n = pd.concat([df_n, phosphorus.reindex(df_n.index)], axis=1)
            df_n = df_n.dropna()
            model_n = pickle.load(open('ml_models/TotalNitrogen-RF.sav', 'rb'))
            nitrogen = np.round(model_n.predict(df_n), 2)
            nitrogen = pd.DataFrame(nitrogen)
            nitrogen.columns = ["Nitrogen"]
            nitrogen_pred_csv = pd.concat([df_n, nitrogen.reindex(df_n.index)], axis=1)
            nitrogen_pred_csv.to_csv("adminlte3/static/admin-lte/dist/js/data/predicted_nitrogen_only.csv", index=False)
            print("Nitrogen predicted")

            # adding nitrogen and phosphorus columns in main data uploaded
            uploaded_csv = pd.concat([uploaded_csv, phosphorus.reindex(df_n.index)], axis=1)
            uploaded_csv = pd.concat([uploaded_csv, nitrogen.reindex(df_n.index)], axis=1)
            uploaded_csv.to_csv("Predicted_n_p.csv", index=False)
            download_np(request)

            # filter values which are >0.02 mg/l in phosphorus
            high_p = uploaded_csv.loc[uploaded_csv.loc[:, 'Phosphorus'] > 0.02]
            high_p.to_csv("adminlte3/static/admin-lte/dist/js/data/high_p.csv", index=False)

            # # filter values which are >10 mg/l in nitrogen
            high_n = uploaded_csv.loc[uploaded_csv.loc[:, 'Nitrogen'] > 10]
            high_n.to_csv("adminlte3/static/admin-lte/dist/js/data/high_n.csv", index=False)

            context = {'shape': csv_shape, 'null_values': null_values, 'high_p': high_p.shape[0],
                       'high_n': high_n.shape[0]}

    except MultiValueDictKeyError:
        error = "Please select file!"
        context = {'file_error': error}

    except KeyError:
        error = "Please select file which has listed parameters!"
        context = {'file_error': error}

    return render(request, "adminlte/upload_file.html", context)


def upload_file_new(request):
    return render(request, "adminlte/upload_file_new.html")


def download_np(request):
    # download final file
    fl_path = "Predicted_n_p.csv"
    filename = "Predicted_n_p.csv"

    fl = open(fl_path, "r")
    mime_type, _ = mimetypes.guess_type(fl_path)
    response = HttpResponse(fl, content_type=mime_type)
    response['Content-Disposition'] = "attachment; filename=%s" % filename
    return response


def upload(request):
    context = {}
    if request.method == 'GET':
        global selectedModel
        selectedModel = request.GET.get('select_model')
        print("get's Upload func.", selectedModel)
        checked = request.GET.get('checked')
        print("What is checked : ", checked)

    if request.method == 'POST':

        try:
            uploaded_file = request.FILES['document']
            fs = FileSystemStorage()
            fs.delete('data/user_uploaded_data/user_uploaded_csv_file.csv')
            name = fs.save('data/user_uploaded_data/user_uploaded_csv_file.csv', uploaded_file)
            print("Filename: ", name)
            print("File uploaded")
            context['url'] = fs.url(name)

            # File operation
            test_df = pd.read_csv(name)
            print(test_df.shape[1])

            # implementing validation
            if (test_df.shape[1] > 20):  # or (test_df.shape[1] != 5):
                error_msg = "File does not contain required features!"
                fs.delete(name)
                print("Invelid file deleted")
                return render(request, 'adminlte/models.html', {'error': error_msg})
                # Todo
                # Create console log using js

            else:
                # prediction
                print("Prediction started.....")
                # selectedModel = request.POST.get("setmodel")
                print("Selected model", selectedModel)

                if selectedModel == "Random Forest 16F":
                    model = pickle.load(open('ml_models/RF_16F_L2_86.sav', 'rb'))
                    df_pred = model.predict(test_df)
                    df_pred = pd.DataFrame(df_pred)
                    df_pred.to_csv("pred.csv", index=False)
                    print("File saved RF, prediction generated")
                    # Merging with test dataset
                    df_pred.columns = ['Phosphorus']
                    new_pred = pd.concat([test_df, df_pred.reindex(test_df.index)], axis=1)
                    new_pred.head()
                    new_pred.to_csv("data/Latest_predictions/predicted_phosphorous.csv", index=False)
                    new_pred.to_csv("data/Latest_predictions/recently_predicted.csv", index=False)
                    new_pred.to_csv("static/admin-lte/dist/js/predicted_phosphorous.csv", index=False)
                    new_pred.to_csv("adminlte3/static/admin-lte/dist/js/data/recently_predicted.csv", index=False)
                    context = {'file_ready': "File is ready to download."}

                elif selectedModel == "XGBoost 5F":  # XGBoost 5F
                    model_xg_1 = pickle.load(open('ml_models/XGB_5F_L1_87.sav', 'rb'))
                    test_df = test_df.rename(columns={"Nitrite": "f0",
                                                      "Total Rain (mm) -1day Total": "f1",
                                                      "TotalNitrogen": "f2",
                                                      "Nitrogen_Kjeldahl": "f3",
                                                      "TotalSuspendedSolids": "f4"})
                    df_pred = model_xg_1.predict(test_df)
                    df_pred = pd.DataFrame(df_pred)
                    df_pred.to_csv("pred.csv", index=False)
                    print("File saved XGBoost I, prediction generated")
                    # Merging with test dataset
                    df_pred.columns = ['Phosphorus']
                    new_pred = pd.concat([test_df, df_pred.reindex(test_df.index)], axis=1)
                    new_pred.head()
                    new_pred.to_csv("data/Latest_predictions/predicted_phosphorus.csv", index=False)
                    new_pred.to_csv("data/Latest_predictions/recently_predicted.csv", index=False)
                    new_pred.to_csv("adminlte3/static/admin-lte/dist/js/data/recently_predicted.csv", index=False)
                    context = {'file_ready': "File is ready to download."}

                    # new_pred.to_csv("static/admin-lte/dist/js/predicted_phosphorous.csv", index=False)

                # elif selectedModel == "XGBoost 19F":
                #     model_cv = pickle.load(open('ml_models/TotalPhosphorous-XG-19F.sav', 'rb'))
                #     df_pred = model_cv.predict(test_df)
                #     df_pred = pd.DataFrame(df_pred)
                #     df_pred.to_csv("pred.csv", index=False)
                #     print("File saved cross validation, prediction generated")
                #     # Merging with test dataset
                #     df_pred.columns = ['Phosphorus']
                #     new_pred = pd.concat([test_df, df_pred.reindex(test_df.index)], axis=1)
                #     new_pred.head()
                #     new_pred.to_csv("data/Latest_predictions/predicted_phosphorus.csv", index=False)
                #     new_pred.to_csv("data/Latest_predictions/recently_predicted.csv", index=False)
                #     new_pred.to_csv("static/admin-lte/dist/js/predicted_phosphorous.csv", index=False)
                #     new_pred.to_csv("adminlte3/static/admin-lte/dist/js/data/recently_predicted.csv", index=False)
                #     context = {'file_ready': "File is ready to download."}

                else:
                    model_error_msg = "Something went wrong with selected model. Refresh the page and try again.";
                    return render(request, 'adminlte/models.html', {'error': model_error_msg})
        except Exception:
            error = "Something is wrong with selected file. Make sure selected file contains listed attributes for selected ML model."
            return render(request, 'adminlte/models.html', {'error': error})

        fs.delete(name)
        print("file deleted")
    return render(request, 'adminlte/models.html', context)


def predictN(request):
    print("predictN is called")

    context = {}
    if request.method == 'GET':
        global selectedModel
        selectedModel = request.GET.get('select_model')
        print("get's PredictN", selectedModel)
    if request.method == 'POST':
        uploaded_file = request.FILES['document']
        fs = FileSystemStorage()
        name = fs.save(uploaded_file.name, uploaded_file)
        print("Filename: ", name)
        print("File uploaded")
        context['url'] = fs.url(name)

        # File operation
        test_df = pd.read_csv(name)
        print(test_df.shape[1])

        # implementing validation
        if (test_df.shape[1] > 20):  # or (test_df.shape[1] != 5):
            error_msg = "File does not contain required features!"
            fs.delete(name)
            print("Invelid file deleted")
            return render(request, 'adminlte/models.html', {'error': error_msg})
            # Todo
            # Create console log using js

        else:
            # prediction
            print("Prediction started.....")
            # selectedModel = request.POST.get("setmodel")
            print("Selected model", selectedModel)

            if selectedModel == "Random Forest 16F":
                model = pickle.load(open('ml_models/TotalNitrogen-RF.sav', 'rb'))
                df_pred = model.predict(test_df)
                df_pred = pd.DataFrame(df_pred)
                df_pred.to_csv("pred.csv", index=False)
                print("File saved RF, prediction generated For N")
                # Merging with test dataset
                df_pred.columns = ['Nitrogen']
                new_pred = pd.concat([test_df, df_pred.reindex(test_df.index)], axis=1)
                new_pred.head()
                new_pred.to_csv("data/Latest_predictions/predicted_Nitrogen.csv", index=False)
                new_pred.to_csv("data/Latest_predictions/recently_predicted.csv", index=False)
                new_pred.to_csv("static/admin-lte/dist/js/predicted_Nitrogen.csv", index=False)
                new_pred.to_csv("adminlte3/static/admin-lte/dist/js/data/recently_predicted.csv", index=False)


            elif selectedModel == "Cross Validation":
                model_xg_1 = pickle.load(open('ml_models/TotalNitrogen-SVR.sav', 'rb'))
                df_pred = model_xg_1.predict(test_df)
                df_pred = pd.DataFrame(df_pred)
                df_pred.to_csv("pred.csv", index=False)
                print("File saved XGBoost I, prediction generated for N")
                # Merging with test dataset
                df_pred.columns = ['Nitrogen']
                new_pred = pd.concat([test_df, df_pred.reindex(test_df.index)], axis=1)
                new_pred.head()
                new_pred.to_csv("data/Latest_predictions/predicted_Nitrogen.csv", index=False)
                new_pred.to_csv("data/Latest_predictions/recently_predicted.csv", index=False)
                new_pred.to_csv("static/admin-lte/dist/js/predicted_Nitrogen.csv", index=False)
                new_pred.to_csv("adminlte3/static/admin-lte/dist/js/data/recently_predicted.csv", index=False)

            else:
                model_error_msg = "Something went wrong with selected model. Refresh current page and select model.";
                return render(request, 'adminlte/models.html', {'error': model_error_msg})

        fs.delete(name)
        print("file deleted")
    return render(request, 'adminlte/models.html', context)


def download_p(request):
    # fill these variables with real values
    print("download_p is called")
    fl_path = "data/Latest_predictions/recently_predicted.csv"
    filename = "data/Latest_predictions/recently_predicted.csv"

    fl = open(fl_path, "r")
    mime_type, _ = mimetypes.guess_type(fl_path)
    response = HttpResponse(fl, content_type=mime_type)
    response['Content-Disposition'] = "attachment; filename=%s" % filename
    # how can I delete it?
    return response


def download_n(request):
    # fill these variables with real values
    print("download_n is called")

    fl_path = "predicted_Nitrogen.csv"
    filename = "predicted_Nitrogen.csv"

    fl = open(fl_path, "r")
    mime_type, _ = mimetypes.guess_type(fl_path)
    response = HttpResponse(fl, content_type=mime_type)
    response['Content-Disposition'] = "attachment; filename=%s" % filename
    # how can I delete it?
    return response


def table_preview(request):
    return render(request, "adminlte/table_preview.html")


def showMap(request):
    df = pd.read_csv("data/Latest_predictions/high_p.csv")

    # geoJsondf = shapefile.Reader("data/Shape_files/durham_points_watersheds.shp")

    # ------locations on map according to given logi and lati in dataset------
    m1 = folium.Map(
        # location=[78.92,43.93 ],
        location=[43.90, -78.79]
        # tiles='Stamen Terrain',
        # zoom_start=15
    )

    df.apply(lambda row: folium.Marker(location=[row["LATITUDE"], row["LONGITUDE"]], tooltip="Click me",
                                       popup='Phosphorus' + str(
                                           row['Phosphorus'])).add_to(m1), axis=1)
    folium.GeoJson("data/Shape_files/TRCA/trcs_shapefile.geojson", name="TRCA").add_to(m1)
    folium.LayerControl().add_to(m1)
    folium.raster_layers.TileLayer('Open Street Map').add_to(m1)
    folium.raster_layers.TileLayer('Stamen Terrain').add_to(m1)
    m1 = m1._repr_html_()
    context = {
        'm': m1,
    }
    return render(request, "adminlte/upload_file.html", context)


# def fancy_html(row, df):
#     i = row
#     featureToAdd = {}
#
#     # print(features)
#     # for feature in features:
#     #     featureToAdd["".format(feature)] = (df[feature].iloc[i])
#     # print()
#     # featureToAdd["".format("Oxygen, Dissolved (% Saturation)")] = df["Oxygen, Dissolved (% Saturation)"].iloc[i]
#
#     o2 = df["Oxygen, Dissolved (% Saturation)"].iloc[i]
#     depth = df["Oxygen, Dissolved (% Saturation)"].iloc[i]
#     Date = df['STATION'].iloc[i]
#     n = df["Oxygen, Dissolved (% Saturation)"].iloc[i]
#     nk = df["Oxygen, Dissolved (% Saturation)"].iloc[i]
#     tss = df["Oxygen, Dissolved (% Saturation)"].iloc[i]
#     p = df["Oxygen, Dissolved (% Saturation)"].iloc[i]
#
#     left_col_colour = "#2A799C"
#     right_col_colour = "#C5DCE7"
#
#     html = """<!DOCTYPE html>
# <html>
#
# <head>
# <h4 style="margin-bottom:0"; width="300px">{}</h4>""".format(Date) + """
#
# </head>
#     <table style="height: 126px; width: 300px;">
# <tbody>
# <td style="background-color: """ + left_col_colour + """;"><span style="color: #ffffff;">O2</span></td>
#             <td style="width: 200px;background-color: """ + right_col_colour + """;">{}</td>""".format(o2) + """
#             </tr>
#             <td style="background-color: """ + left_col_colour + """;"><span style="color: #ffffff;">Nitrogen</span></td>
#             <td style="width: 200px;background-color: """ + right_col_colour + """;">{}</td>""".format(n) + """
#             </tr>
#             <td style="background-color: """ + left_col_colour + """;"><span style="color: #ffffff;">Phosphorus</span></td>
#             <td style="width: 200px;background-color: """ + right_col_colour + """;">{}</td>""".format(p) + """
#             </tr></tbody>
# """
#     # for key in featureToAdd:
#     #     html = html + """<tr>
#     #         <td style="background-color: """ + left_col_colour + """;"><span style="color: #ffffff;">O2</span></td>
#     #         <td style="width: 200px;background-color: """ + right_col_colour + """;">{}</td>""".format(o2) + """
#     #         </tr>"""
#     # html = html + "</table>"
#     return html

# def plotMap(featuresSelected):
#     df = pd.read_csv("data/Latest_predictions/high_p.csv")
#     # df.to_json("adminlte3/static/admin-lte/dist/js/data/all_features.json")
#
#     # geoJsondf = shapefile.Reader("data/Shape_files/durham_points_watersheds.shp")
#
#
#     # ------locations on map according to given logi and lati in dataset------
#     m1 = folium.Map(
#         # location=[78.92,43.93 ],
#         location=[43.90, -78.79]
#         # tiles='Stamen Terrain',
#         # zoom_start=15,
#     )
#     # featuresSelected.append("LATITUDE")
#     # featuresSelected.append("LONGITUDE")
#     # featuresSelected.append("STATION")
#     df.apply(lambda row: folium.Marker(location=[row["LATITUDE"], row["LONGITUDE"]], tooltip="Click me", popup='Oxygen, Dissolved (% Saturation)'+str(row['Phosphorus'])).add_to(m1), axis=1)
#     folium.GeoJson("data/Shape_files/TRCA/trcs_shapefile.geojson", name="TRCA").add_to(m1)
#
#     folium.raster_layers.TileLayer('Open Street Map').add_to(m1)
#     folium.raster_layers.TileLayer('Stamen Terrain').add_to(m1)
#     folium.LayerControl().add_to(m1)
#     # crating popup for selected features
#     df_filtered = df[featuresSelected].copy()
#     # df_filtered.apply(lambda row: folium.Marker(location=[row["LATITUDE"], row["LONGITUDE"]], tooltip="Click me", popup='Oxygen, Dissolved (% Saturation) = '+str(row['Oxygen, Dissolved (% Saturation)'])).add_to(m1), axis=1)
#
#     # if featuresSelected!=None:
#     #     print("Calling fancy")
#     #     for i in range(0, len(df_filtered)):
#     #         html = fancy_html(i,df_filtered)
#     #
#     #         iframe = branca.element.IFrame(html=html, width=200, height=150)
#     #         popup = folium.Popup(iframe, parse_html=True)
#     #
#     #         folium.Marker([df['LATITUDE'].iloc[i], df['LONGITUDE'].iloc[i]],
#     #                       popup=popup, icon=folium.Icon(color="blue", icon='info-sign')).add_to(m1)
#     # else:
#     #     df.apply(lambda row: folium.Marker(location=[row["LATITUDE"], row["LONGITUDE"]], tooltip="Click me", popup='Oxygen, Dissolved (% Saturation)'+str(row['Oxygen, Dissolved (% Saturation)'])).add_to(m1), axis=1)
#
#     # for i in featuresSelected:
#     #     print("feature = ",i)
#     #     df.apply(lambda row: folium.Marker(location=[row["LATITUDE"], row["LONGITUDE"]], tooltip="Click me",
#     #                                        popup=i + str(
#     #                                            row[i])).add_to(m1), axis=1)
#
#     m1 = m1._repr_html_()
#     context = {
#         'm': m1,
#     }
#     return context
def plotMapWithLayers(df):
    # Load Great lakes shape file
    geoJSON_df_greatlakes = gpd.read_file('data/Shape_files/greatlakes_subbasins-New/greatlakes_subbasins.shp')
    geoJSON_df_greatlakes

    # Load Durham shape file
    geoJSON_df_durham = gpd.read_file('data/Shape_files/Durham/durham_points_watersheds.shp')
    geoJSON_df = geoJSON_df_durham.to_crs(epsg='4326')

    # Load TRCA shape file
    geoJSON_df_trca = gpd.read_file('data/Shape_files/TRCA/MyMergedGeometries.shp')
    geoJSON_df_trca = geoJSON_df_trca.to_crs(epsg='4326')

    ################## All Functions
    def getUniqueLocations(df__):
        print("in getUniqueLocations ")
        long_ = []
        lat_ = []
        data = []
        for index, row in df__.iterrows():
            if row['Longitude'] not in long_ and row['Latitude'] not in lat_:
                temp = []
                row = row.fillna("NA")
                long_.append(row['Longitude'])
                lat_.append(row['Latitude'])
                temp.append(row['Longitude'])
                temp.append(row['Latitude'])
                temp.append(str(row['DATE']).split(" ")[0])
                temp.append(row['STATION'])

                if row['TotalPhosphorus'] == 'NA':
                    temp.append(row['TotalPhosphorus'])
                else:
                    temp.append(round(float(row['TotalPhosphorus']), 3))
                if row['TotalNitrogen'] == 'NA':
                    temp.append(row['TotalNitrogen'])
                else:
                    temp.append(round(float(row['TotalNitrogen']), 3))
                temp.append(row['Population'])

                data.append(temp)
        df_new_ = pd.DataFrame(data,
                               columns=['LONGITUDE', 'LATITUDE', 'DATE', 'STATION', 'TotalPhosphorus', 'TotalNitrogen',
                                        'Population'])
        return df_new_

    def poptext(row):
        html = ' <table><tr><th>Parameter </th><th>Value </th></tr><tr><tr><td>Date</td><td>' + str(
            row['DATE']) + '</td></tr><td>Station ID</td><td>' + str(
            row['STATION']) + '</td></tr><tr><td>Latitude</td><td>' + str(
            row['LATITUDE']) + '</td></tr><tr><td>Longitude</td><td>' + str(
            row['LONGITUDE']) + '</td></tr><tr><td>TotalPhosphorus</td><td>' + str(
            row['TotalPhosphorus']) + '</td></tr><tr><td>TotalNitrogen</td><td>' + str(
            row['TotalNitrogen']) + '</td></tr><tr><td>Population</td><td>' + str(
            row['Population']) + '</td></tr></table> '

        test = folium.Html(html, script=True)
        iframe = folium.IFrame(html=test, width=250, height=250)
        return iframe  # folium.Popup(iframe)#, max_width=2650)

    def polystyle(color):
        return {
            'fillColor': color,
            'weight': 1,
            'opacity': 1,
            'color': 'black',
            'fillOpacity': 0.7
        }

    def plotLayers(geoDf, legend_name, layer_color, popup_txt, show_, isGreatLakes, m1):
        temp_legend_name = legend_name
        if not isGreatLakes:
            layer = folium.FeatureGroup(legend_name)

        for _, r in geoDf.iterrows():
            sim_geo = gpd.GeoSeries(r['geometry']).simplify(tolerance=0.0001)
            geo_j = sim_geo.to_json()

            if isGreatLakes:
                temp_legend_name = r[legend_name]
                layer = folium.FeatureGroup(temp_legend_name, show=False)

            geo_j = folium.GeoJson(data=geo_j, name=temp_legend_name, show=show_, overlay=False,
                                   # tooltip=folium.Tooltip(poptext(r[popup_txt], True).render()),
                                   style_function=lambda x: polystyle(layer_color))
            folium.Popup(r[popup_txt]).add_to(geo_j)
            if isGreatLakes:
                geo_j.add_to(layer)
                layer.add_to(m1)
            else:
                geo_j.add_to(layer)

        if not isGreatLakes:
            layer.add_to(m1)
        return m1

    def plotMap_(df_):
        # df_ = df_.dropna()
        print("in plotmap_")
        df_new = getUniqueLocations(df_)
        high_tp = df_[(df_['TotalPhosphorus'] > 0.02)]
        high_tn = df_[(df_['TotalNitrogen'] > 10.00)]

        heatMapData_tp = high_tp[['Latitude', 'Longitude', 'TotalPhosphorus']].copy()
        heatMapData_tn = high_tn[['Latitude', 'Longitude', 'TotalNitrogen']].copy()
        heatMapData_population = df_[['Latitude', 'Longitude', 'Population']].copy().dropna()

        feature_ = folium.FeatureGroup(
            name='<span style=\\"color: blue;\\">Durham + TRCA Stations</span>')  # name='TRCA Jurisdiction')

        # ------locations on map according to given logi and lati in dataset------
        m1 = folium.Map(
            location=[43.90, -78.79]
        )
        HeatMap(heatMapData_tp.values.tolist(), name="High Phosphorus",
                gradient={.4: '#ff7477', .65: '#ff171c', 1: '#8a0003'}).add_to(m1)
        HeatMap(heatMapData_tn.values.tolist(), name="High Nitrogen",
                gradient={.4: '#6dc6fd', .65: '#0383d2', 1: '#024671'}).add_to(m1)
        HeatMap(heatMapData_population.values.tolist(), name="Population",
                gradient={.4: '#8a39ef ', .65: '#5f0fc3', 1: '#380974'}).add_to(m1)

        df_new.apply(lambda row: folium.Marker(location=[row["LATITUDE"], row["LONGITUDE"]],
                                               tooltip=folium.Tooltip(poptext(row).render())).add_to(feature_),
                     # popup=poptext(row)).add_to(feature_),
                     axis=1)

        # Durham Layer plotting
        m1 = plotLayers(geoJSON_df, 'Durham Region', '#eaeaea1a', 'UniqueID', True, False, m1)

        # TRCA Layer plotting
        m1 = plotLayers(geoJSON_df_trca, 'TRCA Region', '#ffffff1a', 'FileName', True, False, m1)

        # Great lakes Layer plotting
        m1 = plotLayers(geoJSON_df_greatlakes, 'lake_names', 'orange', 'lake_names', False, True, m1)
        # m1.get_root().html.add_child(folium.Element("""
        # <div style="position: fixed;
        #      top: 50px; left: 70px; width: 150px; height: 70px;
        #      background-color:grey; border:2px solid grey;z-index: 900;">
        #     <h5>Info. """ + str(df_['TotalPhosphorus'][0]) + """</h5>
        #     <button>Test Button</button>
        # </div>
        # """))
        m1.add_child(feature_)
        m1.add_child(folium.map.LayerControl(collapsed=True))
        return m1

    m1 = plotMap_(df)
    print(m1)
    return m1


# Plot map with markers & choropleth
def plotMap(request):
    if request.method == "GET":
        import plotly.express as px
        # This dataframe has 244 lines, but 4 distinct values for `day`
        df = px.data.tips()
        fig = px.pie(df, values='tip', names='day')
        # ---------------------------------------------------
        df = pd.read_csv('data/data/data_all_cols.csv')
        print("Its get request!!")
        global year
        yearFrom = (request.GET.get('yearFrom'))
        year = yearFrom
        print("Ajax data: ", yearFrom, year)
        m1 = plotMapWithLayers(df)
        # m1.save("data/data/map.html")
        print(m1)
        m1 = m1._repr_html_()
        context = {
            'm': m1,
            'fig': fig
        }
        response = render(request, "adminlte/launch_map.html", context)
        return response

    if request.method == "POST":
        print("its post request")
        print(year)

        df = pd.read_csv('data/data/data_all_cols.csv')
        df = df[(df['Year'] == int(year))]
        print(df.shape)
        m1 = plotMapWithLayers(df)
        m1 = m1._repr_html_()
        context = {
            'm': m1,
        }
        response = render(request, "adminlte/launch_map.html", context)
        return response


features = []


def map_experiment(request):
    # create map
    featuresSelected = []
    # (b.append(a) if a is not None else None)
    if request.GET.get("o2") != None:
        featuresSelected.append(request.GET.get("o2"))
    if request.GET.get("depth") != None:
        featuresSelected.append(request.GET.get("depth"))
    if request.GET.get("n") != None:
        featuresSelected.append(request.GET.get("n"))
    if request.GET.get("nk") != None:
        featuresSelected.append(request.GET.get("nk"))
    if request.GET.get("tss") != None:
        featuresSelected.append(request.GET.get("tss"))
    if request.GET.get("p") != None:
        featuresSelected.append(request.GET.get("p"))
    print(featuresSelected)
    global features
    features = featuresSelected
    context = plotMap(featuresSelected)
    return render(request, "adminlte/map_experiment.html", context)


def advanced(request):
    # yearFrom = request.GET.get('yearFrom')
    # yearTo = request.GET.get('yearTo')
    # print(yearFrom, yearTo)

    # df = pd.read_csv("data/data/df_top_10.csv")
    # df.head()
    # map_experiment(request)
    return render(request, "adminlte/new_page.html")


def about(request):
    return render(request, "adminlte/about.html")


def google_earth(request):
    ee.Authenticate()
    ee.Initialize()

    # create Folium Object
    m = folium.Map(
        location=[28.5973518, 83.54495724],
        zoom_start=8
    )

    # add map to figure

    # select the Dataset Here's used the MODIS data
    dataset = (ee.ImageCollection('MODIS/006/MOD13Q1')
               .filter(ee.Filter.date('2019-07-01', '2019-11-30'))
               .first())
    modisndvi = dataset.select('NDVI')

    # Styling
    vis_paramsNDVI = {
        'min': 0,
        'max': 9000,
        'palette': ['FE8374', 'C0E5DE', '3A837C', '034B48', ]}

    # add the map to the the folium map
    map_id_dict = ee.Image(modisndvi).getMapId(vis_paramsNDVI)

    # GEE raster data to TileLayer
    folium.raster_layers.TileLayer(
        tiles=map_id_dict['tile_fetcher'].url_format,
        attr='Google Earth Engine',
        name='NDVI',
        overlay=True,
        control=True
    ).add_to(m)

    # add Layer control
    m.add_child(folium.map.LayerControl())

    # figure

    # return map
    m = m._repr_html_()


    context = {
        "p": m,
    }

    return render(request, "adminlte/google_earth.html", context)

def arcgis_map(request):
    return render(request, "adminlte/arcgis_map.html")
