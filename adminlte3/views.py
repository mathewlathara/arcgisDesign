import mimetypes
import os
import re
import random
import branca
import numpy as np
import pandas as pd
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse
import pickle
import json
from django.core import serializers
from django.shortcuts import render
from django.utils.datastructures import MultiValueDictKeyError
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from pandas.core.frame import DataFrame
from django.http import JsonResponse
from sklearn.preprocessing import StandardScaler
import re
import folium
from folium.plugins import HeatMap
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import UserRegistration
import urllib.request
from datetime import datetime
import time
import math
from django.http import FileResponse
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from os import listdir
import os.path
from os import path

import matplotlib.pyplot as plt

from sklearn.preprocessing import StandardScaler

from tensorflow import keras
from tensorflow.keras import Sequential
from keras.models import load_model, Model
from tensorflow.keras.layers import Dense
from tensorflow.keras.layers import LSTM

# import geopandas as gpd
# import shapefile


# Create your views here.

# This is the default page
def index(request):
    # create map

    yearslected = "2017"
    col_list = ["STATION", "Latitude", "Longitude",
                "DATE", "TotalPhosphorus", "TotalNitrogen"]
    masterdatafile = pd.read_csv(
        "MasterData-2022-03-27.csv", usecols=col_list, sep=",")
    masterdatafile.DATE = pd.to_datetime(
        masterdatafile.DATE, format='%b %d- %Y', infer_datetime_format=True)
    masterdatafile = masterdatafile[(masterdatafile['DATE'] > yearslected + "-01-01") & (
        masterdatafile['DATE'] < yearslected + "-12-31")].fillna(0)
    if(masterdatafile.count().STATION > 0):
        avgphosphorus = round(masterdatafile["TotalPhosphorus"].mean(), 2)
        avgnitrogen = round(masterdatafile["TotalNitrogen"].mean(), 2)
    stationiconlink = "normalregion.png"
    # if avgphosphorus > 0.02 or avgnitrogen > 10:
    #     stationiconlink = "star.png"

    masterdatafile = masterdatafile.drop(columns=['DATE'])
    uniquecolumnfile = masterdatafile.drop_duplicates()
    print(uniquecolumnfile)
    json_return = []
    stationforloop = ""
    phosphorusnumber = 0
    nitrogernnumber = 0
    for index, row in uniquecolumnfile.iterrows():
        if stationforloop != row[0]:
            filterhotspots = uniquecolumnfile[(
                uniquecolumnfile["STATION"] == row[0])]
            if(filterhotspots.count().STATION > 0):
                phosphorusnumber = round(
                    filterhotspots["TotalPhosphorus"].mean(), 2)
                nitrogernnumber = round(
                    filterhotspots["TotalNitrogen"].mean(), 2)
                if phosphorusnumber > 0.05 or nitrogernnumber > 10:
                    stationiconlink = "hotspot.png"
            # print(f"stationid-----> {row[0]} nitrogen ----> {nitrogernnumber}  phosphrusnumber -----> {phosphorusnumber}")
        stationforloop = row[0]
        # masterdatafileduplicate = masterdatafileduplicate[(masterdatafileduplicate['DATE'] > yearslected + "-01-01") & (masterdatafileduplicate['DATE'] < yearslected + "-12-31") & (masterdatafileduplicate['STATION'] == row[0])].fillna(0)
        # print(f"{masterdatafileduplicate}")
        # avgphosphorus = 0
        # avgnitrogen = 0
        # if(masterdatafile.count().STATION > 0):
        #     avgphosphorus = round(masterdatafile["TotalPhosphorus"].mean(),2)
        #     avgnitrogen = round(masterdatafile["TotalNitrogen"].mean(),2)
        # stationiconlink = "star.png"
        # if avgphosphorus > 0.02 or avgnitrogen > 10:
        #     stationiconlink = "star.png"
        loopvalue = {"station": row[0], "latitude": row[1],
                     "longitude": row[2], "stationiconlink": stationiconlink}
        json_return.append(loopvalue)
    print(f"Year selected: {yearslected}")
    json_return = json.dumps(json_return)
    regiondemographicrenderurl = "https://services.arcgis.com/t0XyVE44waBIPBFr/arcgis/rest/services/trca_landuse_naturalcover_2017shp/FeatureServer/0"
    return render(request, "adminlte/index1.html", {"jsonvalue": json_return, "regiondemographicrenderurl": regiondemographicrenderurl, "yearselected": yearslected})
# This file is supposed to be edited in terms of making changes on main dashboard


def new_index_page(request):
    return render(request, "adminlte/index_new.html")


def filterpagefromindex(request, year):
    print(f"THe year selected---- {year}")
    yearslected = year
    # create map
    if yearslected == "":
        yearslected = "2017"
    col_list = ["STATION", "Latitude", "Longitude",
                "DATE", "TotalPhosphorus", "TotalNitrogen"]
    masterdatafile = pd.read_csv(
        "MasterData-2022-03-27.csv", usecols=col_list, sep=",")
    masterdatafile.DATE = pd.to_datetime(
        masterdatafile.DATE, format='%b %d- %Y', infer_datetime_format=True)
    masterdatafile = masterdatafile[(masterdatafile['DATE'] > yearslected + "-01-01") & (
        masterdatafile['DATE'] < yearslected + "-12-31")].fillna(0)
    if(masterdatafile.count().STATION > 0):
        avgphosphorus = round(masterdatafile["TotalPhosphorus"].mean(), 2)
        avgnitrogen = round(masterdatafile["TotalNitrogen"].mean(), 2)
    stationiconlink = "normalregion.png"
    # if avgphosphorus > 0.02 or avgnitrogen > 10:
    #     stationiconlink = "star.png"

    masterdatafile = masterdatafile.drop(columns=['DATE'])
    uniquecolumnfile = masterdatafile.drop_duplicates()
    print(uniquecolumnfile)
    json_return = []
    stationforloop = ""
    phosphorusnumber = 0
    nitrogernnumber = 0
    for index, row in uniquecolumnfile.iterrows():
        if stationforloop != row[0]:
            filterhotspots = uniquecolumnfile[(
                uniquecolumnfile["STATION"] == row[0])]
            if(filterhotspots.count().STATION > 0):
                phosphorusnumber = round(
                    filterhotspots["TotalPhosphorus"].mean(), 2)
                nitrogernnumber = round(
                    filterhotspots["TotalNitrogen"].mean(), 2)
                if phosphorusnumber > 0.05 or nitrogernnumber > 10:
                    stationiconlink = "hotspot.png"
            # print(f"stationid-----> {row[0]} nitrogen ----> {nitrogernnumber}  phosphrusnumber -----> {phosphorusnumber}")
        stationforloop = row[0]
        # masterdatafileduplicate = masterdatafileduplicate[(masterdatafileduplicate['DATE'] > yearslected + "-01-01") & (masterdatafileduplicate['DATE'] < yearslected + "-12-31") & (masterdatafileduplicate['STATION'] == row[0])].fillna(0)
        # print(f"{masterdatafileduplicate}")
        # avgphosphorus = 0
        # avgnitrogen = 0
        # if(masterdatafile.count().STATION > 0):
        #     avgphosphorus = round(masterdatafile["TotalPhosphorus"].mean(),2)
        #     avgnitrogen = round(masterdatafile["TotalNitrogen"].mean(),2)
        # stationiconlink = "star.png"
        # if avgphosphorus > 0.02 or avgnitrogen > 10:
        #     stationiconlink = "star.png"
        loopvalue = {"station": row[0], "latitude": row[1],
                     "longitude": row[2], "stationiconlink": stationiconlink}
        json_return.append(loopvalue)
    print(f"Year selected: {yearslected}")
    json_return = json.dumps(json_return)
    regiondemographicrenderurl = "https://services.arcgis.com/t0XyVE44waBIPBFr/arcgis/rest/services/trca_landuse_naturalcover_2017shp/FeatureServer/0"
    return render(request, "adminlte/dexterity.html", {"jsonvalue": json_return, "regiondemographicrenderurl": regiondemographicrenderurl, "yearselected": yearslected})


def logincontroller(request):
    return render(request, "adminlte/login1.html")


def datasourcespage(request):
    return render(request, "adminlte/datasourcespage.html")


def contact_us_page(request):
    return render(request, "adminlte/contactpage.html")


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
    # render(request, 'adminlte/dashboard.html', bar_phos_val)
    return JsonResponse(bar_phos_val)


def censusBarChart(request):
    censusYear, totalPhosh, nitrateNitrite = censusData(request)
    bar_phos_val = {'labels': censusYear, 'data': totalPhosh}
    bar_nitrate_val = {'labels': censusYear, 'data': nitrateNitrite}
    # render(request, 'adminlte/dashboard.html', bar_phos_val)
    return JsonResponse(bar_phos_val)


def censusPieChart(request):
    censusYear, totalPhosh, nitrateNitrite = censusData(request)
    pie_phos_val = {'labels': censusYear, 'data': totalPhosh}
    bar_nitrate_val = {'labels': censusYear, 'data': nitrateNitrite}
    # render(request, 'adminlte/dashboard.html', pie_phos_val)#JsonResponse(pie_phos_val)#
    return censusYear, totalPhosh, nitrateNitrite


def reading_csv(request):
    global df
    df = pd.read_csv(
        open('data/data/merged_dataset.csv', 'rt', encoding='utf8'))


def yearlyData(request):
    Year = []
    phosphorous = []
    nitrateNitrite = []

    global df
    df = pd.read_csv(
        open('data/data/merged_dataset.csv', 'rt', encoding='utf8'))
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
    df = pd.read_csv(
        open('data/Latest_predictions/recently_predicted.csv', 'rt', encoding='utf8'))
    df_ = df.sort_values(by=['Year'])
    df_ = df_.groupby('Year').mean().reset_index()
    df_ = DataFrame(df_)

    if "TotalPhosphorus" in df_.columns:
        for index, row in df_.iterrows():
            phosphorous.append(row['TotalPhosphorus'])
            Year.append(row['Year'])
            # nitrogen.append(row['TotalNitrogen'])
    if "TotalNitrogen" in df_.columns:
        for index, row in df_.iterrows():
            phosphorous.append(row['TotalNitrogen'])
            Year.append(row['Year'])
            # nitrogen.append(row['TotalNitrogen'])

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

        model_info = {'ac1': round(random_forest[0], 2), 'ac2': round(
            random_forest[1], 2), 'ac3': round(random_forest[2], 2), 'ac4': random_forest[3]}
        send_info = {}
        if selectedModel == "Random Forest":
            print("rf if")
            print(request.GET.get("model"))
            send_info = {'ac1': round(random_forest[0], 2), 'ac2': round(
                random_forest[1], 2), 'ac3': round(random_forest[2], 2), 'ac4': random_forest[3]}
            return render(request, 'adminlte/models.html', send_info)

        elif selectedModel == "Cross Validation":
            print("inside cv")
            print(request.GET.get("model"))
            send_info = {'ac1': cross_validation[0], 'ac2': cross_validation[1],
                         'ac3': cross_validation[2], 'ac4': cross_validation[2]}
            return render(request, 'adminlte/models.html', send_info)

        elif selectedModel == "XGBoost I":
            print("inside xg 1")
            send_info = {
                'ac1': xgboost_1[0], 'ac2': xgboost_1[1], 'ac3': xgboost_1[2], 'ac4': xgboost_1[2]}
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
        # , {'ac1': round(ac[0], 2), 'ac2': round(ac[1], 2),
        return render(request, 'adminlte/models.html', {'ans': parameters, 'p': str(round(phosphorus[0], 2))})
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
        parameters = [[ph, month, year, cyear,
                       rain0, rainm3, rainm1, nitrogen, nk]]
        param_dict = {}
        print(parameters)
        model = pickle.load(
            open(r'/home/disha/Downloads/forest_reg.sav', 'rb'))
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
        model = pickle.load(
            open(r'/home/disha/Downloads/TotalPhosphorous_XG_87.sav', 'rb'))
        phosphorus = model.predict(parameters)
        print(phosphorus[0])
        return parameters, phosphorus


def upload_phosphorus_nitrogen(request):
    return render(request, "adminlte/upload_data.html")


def upload_file(request):
    context = {}
    try:
        if request.method == 'POST':
            # if fs.exists(name):
            # os.remove(os.path.join(settings.MEDIA_ROOT, name))
            uploaded_file = request.FILES['csv_file']
            fs = FileSystemStorage()
            fs.delete('data/user_uploaded_data/user_uploaded_csv_file.csv')
            name = fs.save(
                'data/user_uploaded_data/user_uploaded_csv_file.csv', uploaded_file)
            print("Filename: ", name)
            print("File uploaded")
            context['url'] = fs.url(name)
            uploaded_csv = pd.read_csv(name)
            csv_shape = uploaded_csv.shape
            null_values = uploaded_csv.isna().sum().sum()

            # divide columns and predict phosphorus
            # df_p = uploaded_csv[[	'Nitrogen_Kjeldahl',	'TotalSuspendedSolids',	'Nitrate',	'Conductivity',	'DissolvedOxygen',	'pH',	'TotalNitrogen',	'Nitrite',	'Chloride',	'10mLandCover_AgriculturalExtraction',	'CensusYear',	'Total Rain (mm) 0day Total',	'Total Rain (mm) -7day Total',	'Total Rain (mm) -56day Total',	'Total Rain (mm) -3day Total',	'Total Rain (mm) -28day Total',	'Total Rain (mm) -1day Total',	'Total Rain (mm) -14day Total',	'Month']].copy()
            # model = pickle.load(open('ml_models/TotalPhosphorous-XG-19F.sav', 'rb'))

            df_p = uploaded_csv[['Oxygen, Dissolved (% Saturation)', 'Depth, Sample (Field)',
                                 'Nitrite', 'Nitrogen, Total Kjeldahl (TKN)', 'Solids, Suspended (TSS)']].copy()
            df_p = df_p.dropna()
            df_p.to_csv("df_p.csv", index=False)
            model = pickle.load(
                open(r'/home/disha/Downloads/TotalPhosphorous_XG_87.sav', 'rb'))
            phosphorus = np.round(model.predict(df_p), 2)
            phosphorus = pd.DataFrame(phosphorus)
            phosphorus.columns = ['Phosphorus']
            phosphorus_pred_csv = pd.concat(
                [df_p, phosphorus.reindex(df_p.index)], axis=1)
            phosphorus_pred_csv.to_csv(
                "adminlte3/static/admin-lte/dist/js/data/predicted_phosphorus_only.csv", index=False)
            print("Phosphorus predicted")

            # Predict Nitrogen
            df_n = uploaded_csv[['Chloride, Total',
                                 'Nitrogen; nitrite', 'Nitrate']].copy()
            df_n = pd.concat([df_n, phosphorus.reindex(df_n.index)], axis=1)
            df_n = df_n.dropna()
            model_n = pickle.load(
                open(r'/home/disha/Downloads/TotalNitrogen-RF.sav', 'rb'))
            nitrogen = np.round(model_n.predict(df_n), 2)
            nitrogen = pd.DataFrame(nitrogen)
            nitrogen.columns = ["Nitrogen"]
            nitrogen_pred_csv = pd.concat(
                [df_n, nitrogen.reindex(df_n.index)], axis=1)
            nitrogen_pred_csv.to_csv(
                "adminlte3/static/admin-lte/dist/js/data/predicted_nitrogen_only.csv", index=False)
            print("Nitrogen predicted")

            # adding nitrogen and phosphorus columns in main data uploaded
            uploaded_csv = pd.concat(
                [uploaded_csv, phosphorus.reindex(df_n.index)], axis=1)
            uploaded_csv = pd.concat(
                [uploaded_csv, nitrogen.reindex(df_n.index)], axis=1)
            uploaded_csv.to_csv("Predicted_n_p.csv", index=False)
            download_np(request)

            # filter values which are >0.02 mg/l in phosphorus
            high_p = uploaded_csv.loc[uploaded_csv.loc[:, 'Phosphorus'] > 0.02]
            high_p.to_csv(
                "adminlte3/static/admin-lte/dist/js/data/high_p.csv", index=False)

            # # filter values which are >10 mg/l in nitrogen
            high_n = uploaded_csv.loc[uploaded_csv.loc[:, 'Nitrogen'] > 10]
            high_n.to_csv(
                "adminlte3/static/admin-lte/dist/js/data/high_n.csv", index=False)

            context = {'shape': csv_shape, 'null_values': null_values,
                       'high_p': high_p.shape[0], 'high_n': high_n.shape[0]}

    except MultiValueDictKeyError:
        error = "Please select file!"
        context = {'file_error': error}

    return render(request, "adminlte/upload_file_new.html", context)


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

        # uploaded_file = request.FILES['document']
        # fs = FileSystemStorage()
        # fs.delete('data/user_uploaded_data/user_uploaded_csv_file.csv')
        # name = fs.save('data/user_uploaded_data/user_uploaded_csv_file.csv', uploaded_file)
        # print("Filename: ",name)
        # print("File uploaded")
        # context['url'] = fs.url(name)

        # File operation
        file_path = 'adminlte3/static/admin-lte/assets/uploaded_data/user_uploaded_csv_file.csv'
        test_df = pd.read_csv(file_path)
        cols = test_df.shape[1]
        print(cols)
        # new approach
        predictionFeature = ""
        if cols == 8:  # and predictionFeature == 'tp':
            pass
        if cols == 11:  # and predictionFeature == 'tn':
            pass
        if predictionFeature == 'tn':
            pass

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
                model = pickle.load(
                    open(r'/home/disha/Downloads/TotalPhosphorous-RF-11.sav', 'rb'))
                print(test_df.columns)
                test_df = test_df[['pH', '250mLandCover_Natural', 'DissolvedOxygen',
                                   'Total Rain (mm) -7day Total', 'Population', 'Nitrate', 'Chloride',
                                   'Nitrite', 'TotalNitrogen', 'TotalSuspendedSolids',
                                   'Nitrogen_Kjeldahl']].copy()
                df_pred = model.predict(test_df)
                df_pred = pd.DataFrame(df_pred)
                df_pred.to_csv("pred.csv", index=False)
                print("File saved RF, prediction generated")
                # Merging with test dataset
                df_pred.columns = ['TotalPhosphorus']
                new_pred = pd.concat(
                    [test_df, df_pred.reindex(test_df.index)], axis=1)
                new_pred.head()
                new_pred.to_csv(
                    "data/Latest_predictions/predicted_phosphorous.csv", index=False)
                new_pred.to_csv(
                    "data/Latest_predictions/recently_predicted.csv", index=False)
                new_pred.to_csv(
                    "adminlte3/static/admin-lte/dist/js/predicted_phosphorous.csv", index=False)
                new_pred.to_csv(
                    "adminlte3/static/admin-lte/dist/js/data/recently_predicted.csv", index=False)
                context = {'file_ready': "File is ready to download."}

            elif selectedModel == "XGBoost 5F":  # XGBoost 5F
                model_xg_1 = pickle.load(
                    open(r'/home/disha/Downloads/TotalPhosphorous-RF-8F.sav', 'rb'))
                test_df = test_df[['pH', '250mLandCover_Natural', 'DissolvedOxygen',
                                   'Population', 'Chloride',
                                   'Nitrite', 'TotalSuspendedSolids',
                                   'Nitrogen_Kjeldahl']]
                df_pred = model_xg_1.predict(test_df)
                df_pred = pd.DataFrame(df_pred)
                df_pred.to_csv("pred.csv", index=False)
                print("File saved XGBoost I, prediction generated")
                # Merging with test dataset
                df_pred.columns = ['TotalPhosphorus']
                new_pred = pd.concat(
                    [test_df, df_pred.reindex(test_df.index)], axis=1)
                new_pred.head()
                new_pred.to_csv(
                    "data/Latest_predictions/predicted_phosphorus.csv", index=False)
                new_pred.to_csv(
                    "data/Latest_predictions/recently_predicted.csv", index=False)
                new_pred.to_csv(
                    "adminlte3/static/admin-lte/dist/js/data/recently_predicted.csv", index=False)
                context = {'file_ready': "File is ready to download."}

                # new_pred.to_csv("static/admin-lte/dist/js/predicted_phosphorous.csv", index=False)

            elif selectedModel == "XGBoost 19F":
                model_cv = pickle.load(
                    open(r'/home/disha/Downloads/TotalPhosphorous-XG-19F.sav', 'rb'))
                df_pred = model_cv.predict(test_df)
                df_pred = pd.DataFrame(df_pred)
                df_pred.to_csv("pred.csv", index=False)
                print("File saved cross validation, prediction generated")
                # Merging with test dataset
                df_pred.columns = ['Phosphorus']
                new_pred = pd.concat(
                    [test_df, df_pred.reindex(test_df.index)], axis=1)
                new_pred.head()
                new_pred.to_csv(
                    "data/Latest_predictions/predicted_phosphorus.csv", index=False)
                new_pred.to_csv(
                    "data/Latest_predictions/recently_predicted.csv", index=False)
                new_pred.to_csv(
                    "static/admin-lte/dist/js/predicted_phosphorous.csv", index=False)
                new_pred.to_csv(
                    "adminlte3/static/admin-lte/dist/js/data/recently_predicted.csv", index=False)
                context = {'file_ready': "File is ready to download."}

            else:
                model_error_msg = "Something went wrong with selected model"
                return render(request, 'adminlte/models.html', {'error': model_error_msg})

        # fs.delete(name)
        # print("file deleted")
    return render(request, 'adminlte/models.html', context)


def predictN(request):
    print("predictN is called")

    context = {}
    if request.method == 'GET':
        global selectedModel
        selectedModel = request.GET.get('select_model')
        print("get's PredictN", selectedModel)
    if request.method == 'POST':
        # uploaded_file = request.FILES['document']
        # fs = FileSystemStorage()
        # name = fs.save(uploaded_file.name, uploaded_file)
        # print("Filename: ",name)
        # print("File uploaded")
        # context['url'] = fs.url(name)

        # File operation
        file_path = 'adminlte3/static/admin-lte/assets/uploaded_data/user_uploaded_csv_file.csv'
        test_df = pd.read_csv(file_path)
        test_df = test_df[['Month', 'pH', 'Population', '10mLandCover_Natural', '10mLandCover_AnthropogenicNatural',
                           'TotalSuspendedSolids', 'Conductivity', 'TotalPhosphorus', 'Chloride', 'Nitrate']]
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

            if selectedModel == "Random Forest":
                model = pickle.load(
                    open(r'/home/disha/Downloads/TotalNitrogen-RF-10F.sav', 'rb'))
                df_pred = model.predict(test_df)
                df_pred = pd.DataFrame(df_pred)
                df_pred.to_csv("pred.csv", index=False)
                print("File saved RF, prediction generated For N")
                # Merging with test dataset
                df_pred.columns = ['Nitrogen']
                new_pred = pd.concat(
                    [test_df, df_pred.reindex(test_df.index)], axis=1)
                new_pred.head()
                new_pred.to_csv(
                    "data/Latest_predictions/predicted_Nitrogen.csv", index=False)
                new_pred.to_csv(
                    "data/Latest_predictions/recently_predicted.csv", index=False)
                new_pred.to_csv(
                    "adminlte3/static/admin-lte/dist/js/predicted_Nitrogen.csv", index=False)
                new_pred.to_csv(
                    "adminlte3/static/admin-lte/dist/js/data/recently_predicted.csv", index=False)
                context = {'file_ready': "File is ready to download."}

            elif selectedModel == "Cross Validation":
                model_xg_1 = pickle.load(
                    open(r'/home/disha/Downloads/TotalNitrogen-SVR.sav', 'rb'))
                df_pred = model_xg_1.predict(test_df)
                df_pred = pd.DataFrame(df_pred)
                df_pred.to_csv("pred.csv", index=False)
                print("File saved XGBoost I, prediction generated for N")
                # Merging with test dataset
                df_pred.columns = ['TotalNitrogen']
                new_pred = pd.concat(
                    [test_df, df_pred.reindex(test_df.index)], axis=1)
                new_pred.head()
                new_pred.to_csv(
                    "data/Latest_predictions/predicted_Nitrogen.csv", index=False)
                new_pred.to_csv(
                    "data/Latest_predictions/recently_predicted.csv", index=False)
                new_pred.to_csv(
                    "static/admin-lte/dist/js/predicted_Nitrogen.csv", index=False)
                new_pred.to_csv(
                    "adminlte3/static/admin-lte/dist/js/data/recently_predicted.csv", index=False)
                context = {'file_ready': "File is ready to download."}

            else:
                model_error_msg = "Something went wrong with selected model"
                return render(request, 'adminlte/models.html', {'error': model_error_msg})

        # fs.delete(name)
        # print("file deleted")
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
    return render(request, "django-adminlte3-master/ml_models/MapView.html")


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

def poptext(row):
    if ((row['TotalNitrogen']) and (row['TotalPhosphorus'])):
        html = "<a><b>" + str(row['STATION']) + "</b><br>"+"<br>TotalNitrogen: " + str(row['TotalNitrogen']) + "</b><br>" + \
            "<br>TotalPhosphorus: " + \
            str(row['TotalPhosphorus']) + "</b><br>" + \
            "<br>Year: " + str(row['Year']) + "</a>"
        iframe = folium.IFrame(html=html, width=200, height=200)
        return folium.Popup(iframe)
    if row['TotalNitrogen']:
        html = "<a><b>" + str(row['STATION']) + "</b><br>"+"<br>TotalNitrogen: " + str(
            row['TotalNitrogen']) + "</b><br>"+"<br>Year: " + str(row['Year']) + "</a>"
        iframe = folium.IFrame(html=html, width=200, height=200)
        return folium.Popup(iframe)  # , max_width=2650)
    else:
        html = "<a><b>" + str(row['STATION']) + "</b><br>"+"<br>TotalPhosphorus: " + str(
            row['TotalPhosphorus']) + "</b><br>"+"<br>Year: " + str(row['Year']) + "</a>"
        iframe = folium.IFrame(html=html, width=200, height=200)
        return folium.Popup(iframe)  # , max_width=2650)

# Plot map with markers & choropleth


@api_view(('GET',))
def getYearForAnalysisMap(request):
    if request.GET['year']:
        year = request.GET['year']
        global yearForMap
        yearForMap = int(year)
        global data_type
        data_type = request.GET['data_type']
        print("Year in plotMap: ", year)
    return Response({'status': 'done'})


yearForMap = 2010
data_type = "historical"


def plotMap(yearForMap):
    context = {}
    try:
        print("Global Year: ", yearForMap)
        if data_type == "historical":
            print(data_type)
            df_new = pd.read_csv(
                'https://raw.githubusercontent.com/DishaCoder/CSV/main/WMS_dataset.csv')
        elif data_type == "custom":
            print(data_type)
            df_new = pd.read_csv(
                'data/Latest_predictions/recently_predicted.csv')
        else:
            context['error'] = "Got error while selecting dataset."
        df_new = df_new[df_new['Year'] == yearForMap]
        #   if "TotalNitrogen" in df_new.columns:
        #     high_tp = df_new[df_new['TotalNitrogen'] > 5.0]
        #     HeatMap(high_tp.values.tolist(), name="High Phosphorus").add_to(m1)

        # name='TRCA Jurisdiction')
        feature_ = folium.FeatureGroup(
            name='<span style=\\"color: blue;\\">Durham + TRCA Stations</span>')

        # ------locations on map according to given logi and lati in dataset------
        m1 = folium.Map(
            location=[43.90, -78.79],
            scrollWheelZoom=False
        )

        df_new.apply(lambda row: folium.Marker(location=[row["Latitude"], row["Longitude"]], popup=poptext(
            row), icon=folium.Icon(color='red')).add_to(feature_), axis=1)
        # HeatMap(heatMapData.values.tolist(), name="High Phosphorus").add_to(m1)

        m1.add_child(feature_)
        m1.add_child(folium.map.LayerControl())

        m1 = m1._repr_html_()
        context = {'m': m1, }
    except:
        context['error'] = "File does not have Latitude and Longitude."
    return context


features = []


def map_experiment(request, year):
    yearslected = year
    # yearslected = request.GET.get('yearid')
    # create map

    if yearslected == "":
        yearslected = "2017"
    col_list = ["STATION", "Latitude", "Longitude",
                "DATE", "TotalPhosphorus", "TotalNitrogen"]
    masterdatafile = pd.read_csv(
        "MasterData-2022-03-27.csv", usecols=col_list, sep=",")
    masterdatafile.DATE = pd.to_datetime(
        masterdatafile.DATE, format='%b %d- %Y', infer_datetime_format=True)
    masterdatafile = masterdatafile[(masterdatafile['DATE'] > yearslected + "-01-01") & (
        masterdatafile['DATE'] < yearslected + "-12-31")].fillna(0)
    if(masterdatafile.count().STATION > 0):
        avgphosphorus = round(masterdatafile["TotalPhosphorus"].mean(), 2)
        avgnitrogen = round(masterdatafile["TotalNitrogen"].mean(), 2)
    stationiconlink = "normalregion.png"
    # if avgphosphorus > 0.02 or avgnitrogen > 10:
    #     stationiconlink = "star.png"

    masterdatafile = masterdatafile.drop(columns=['DATE'])
    uniquecolumnfile = masterdatafile.drop_duplicates()
    print(uniquecolumnfile)
    json_return = []
    stationforloop = ""
    phosphorusnumber = 0
    nitrogernnumber = 0
    for index, row in uniquecolumnfile.iterrows():
        if stationforloop != row[0]:
            filterhotspots = uniquecolumnfile[(
                uniquecolumnfile["STATION"] == row[0])]
            if(filterhotspots.count().STATION > 0):
                phosphorusnumber = round(
                    filterhotspots["TotalPhosphorus"].mean(), 2)
                nitrogernnumber = round(
                    filterhotspots["TotalNitrogen"].mean(), 2)
                if phosphorusnumber > 0.05 or nitrogernnumber > 10:
                    stationiconlink = "hotspot.png"
            # print(f"stationid-----> {row[0]} nitrogen ----> {nitrogernnumber}  phosphrusnumber -----> {phosphorusnumber}")
        stationforloop = row[0]
        # masterdatafileduplicate = masterdatafileduplicate[(masterdatafileduplicate['DATE'] > yearslected + "-01-01") & (masterdatafileduplicate['DATE'] < yearslected + "-12-31") & (masterdatafileduplicate['STATION'] == row[0])].fillna(0)
        # print(f"{masterdatafileduplicate}")
        # avgphosphorus = 0
        # avgnitrogen = 0
        # if(masterdatafile.count().STATION > 0):
        #     avgphosphorus = round(masterdatafile["TotalPhosphorus"].mean(),2)
        #     avgnitrogen = round(masterdatafile["TotalNitrogen"].mean(),2)
        # stationiconlink = "star.png"
        # if avgphosphorus > 0.02 or avgnitrogen > 10:
        #     stationiconlink = "star.png"
        loopvalue = {"station": row[0], "latitude": row[1],
                     "longitude": row[2], "stationiconlink": stationiconlink}
        json_return.append(loopvalue)
    print(f"Year selected: {yearslected}")
    json_return = json.dumps(json_return)
    regiondemographicrenderurl = ""
    if yearslected == "2017":
        regiondemographicrenderurl = "https://services.arcgis.com/t0XyVE44waBIPBFr/arcgis/rest/services/trca_landuse_naturalcover_2017shp/FeatureServer/0"
    elif yearslected == "2013":
        regiondemographicrenderurl = "https://services.arcgis.com/t0XyVE44waBIPBFr/arcgis/rest/services/habitat_2013_trcashp/FeatureServer/0"
    elif yearslected == "2007" or yearslected == "2008":
        regiondemographicrenderurl = "https://services.arcgis.com/t0XyVE44waBIPBFr/arcgis/rest/services/habitat_2007_2008_trcashp/FeatureServer/0"
    elif yearslected == "2002":
        regiondemographicrenderurl = "https://services.arcgis.com/t0XyVE44waBIPBFr/arcgis/rest/services/habitat_2002_trcashp/FeatureServer/0"
    # print(json_return)
    # context = plotMap(featuresSelected)
    return render(request, "adminlte/map_experiment.html", {"jsonvalue": json_return, "regiondemographicrenderurl": regiondemographicrenderurl, "yearselected": yearslected})
# filtering and grouping data


def getGraphDataByYear(df, yearFrom, yearTo, station, feature):
  print("getGraphDataByYear:::", yearFrom, yearTo, station, feature)
  if station == "all":
    df = df[(df['Year'] >= int(yearFrom)) & (df['Year'] <= int(yearTo))]
  else :
    df = df[(df['Year'] >= int(yearFrom)) & (df['Year'] <= int(yearTo)) & (df['Station'] == (station))]

  onX = df[[feature, 'Year']].copy()
  
  grouped = np.array(onX.groupby(['Year']).mean()).flatten()
  years_only = np.sort(np.array(df['Year'].drop_duplicates()))
  df_grouped = pd.DataFrame({'Year': years_only, feature: grouped}, columns=['Year', feature])
  print(df_grouped.shape)
  return df_grouped #.to_numpy()

# @api_view(('GET', 'POST'))
def filterDataForAnalysisPage(request, yearFrom, yearTo, station, featureOnX_encoded, featureOnY_encoded, data_type):
    print("filterDataForAnalysisPage called.....")
    encode_features = {'1':'Nitrogen Kjeldahl (mg/L)', '2':'Total Suspended Solids (mg/L)',
        '3':'Nitrate (mg/L)', '4':'Conductivity (K)', '5':'Dissolved Oxygen (mg/L)', '6':'pH','7':
        'Total Nitrogen (mg/L)','8': 'Nitrite (mg/L)','9': 'Total Phosphorus (mg/L)','10':
        'Chloride (mg/L)','11':'Natural Land 10m (ha)','12':
        'Anthropogenic Natural Land 10m (ha)','13': 'Anthropogenci Land 10m (ha)','14':
        'Station','15': 'Date', '16':'Year', '17':'Agricultural Land 250m (ha)','18':
        'Natural Land 250m (ha)','19':
        'Population','20': 'Total Rain (mm) -14day Total','21':
        'Total Rain (mm) -1day Total','22': 'Total Rain (mm) -28day Total','23':
        'Total Rain (mm) -3day Total', '24':'Total Rain (mm) -56day Total','25':
        'Total Rain (mm) -7day Total','26': 'Total Rain (mm) 0day Total'}
    featureOnX = encode_features[featureOnX_encoded]
    featureOnY = encode_features[featureOnY_encoded]


# def filterDataForAnalysisPage(request):
    # if request.GET['yearFrom']:
    #     yearFrom = request.GET['yearFrom']
    #     yearTo = request.GET['yearTo']
    #     station = request.GET['station']
    #     featureOnX = request.GET['feature1']
    #     featureOnY = request.GET['feature2']
    #     global data_type
    #     data_type = request.GET['data_type']
    #     print("I am here 1")

    print(yearFrom, yearTo, station, featureOnX, featureOnY, data_type)
    # featureOnX = featureOnX.replace('_', ' ')
    # featureOnY = featureOnY.replace('_', ' ')
    if data_type == "historical":
        print("historical")
        df_new = pd.read_csv(
            'https://raw.githubusercontent.com/DishaCoder/CSV/main/MasterData_For_Web_22_July.csv')
        df_new = df_new.fillna(0)
        print("I am here 2")
    if data_type == "custom":
        print("custom")
        df_new = pd.read_csv('data/Latest_predictions/recently_predicted.csv')
        df_new = df_new.fillna(0)
        print("I am here 3")
    filtered_data_1 = getGraphDataByYear(
        df_new, yearFrom, yearTo, station, featureOnX)
    graph1x = filtered_data_1.iloc[:, 0].to_numpy()
    graph1y = filtered_data_1.iloc[:, 1].to_numpy()
    print("I am here 4")
    description1 = "The graph shows "+featureOnX + \
        " amount(on Y) recorded in years between "+yearFrom+" to "+yearTo + \
        "(on X)." + "NOTE: All the units are in mg/L, ml or Ha respectively."

    filtered_data_2 = getGraphDataByYear(
        df_new, yearFrom, yearTo, station, featureOnY)
    graph2x = filtered_data_2.iloc[:, 0].to_numpy()
    graph2y = filtered_data_2.iloc[:, 1].to_numpy()
    description2 = "The graph shows "+featureOnY + \
        " amount(on Y) recorded in years between "+yearFrom+" to "+yearTo + \
        "(on X)." + "NOTE: All the units are in mg/L, ml or Ha respectively."
    print("graph arrays === ", graph1x, graph1y)
    print("type of arrays === ", type(graph1x), type(graph1y))
    graph1x = np.array(graph1x).tolist()
    graph1y = np.array(graph1y).tolist()
    graph2x = np.array(graph2x).tolist()
    graph2y = np.array(graph2y).tolist()
    plot_graph = ({'graph1x': graph1x, 'graph1y': graph1y, 'graph2x': graph2x, 'graph2y': graph2y, 'description1': description1, 'description2': description2})

    return JsonResponse(plot_graph)


def advanced(request):
    # geoJSON_df_durham =gpd.read_file( "data/Shape files/durham_points_watersheds.shp")
    print("I am here")
    # geoJSON_df_trca = gpd.read_file('/content/drive/MyDrive/Watershed Management system/My Codes/maps/NewTRCARegion/MyMergedGeometries.shp')

    context = plotMap(yearForMap)
    context['year'] = yearForMap

    return render(request, "adminlte/analysis.html", context)


def about(request):
    return render(request, "adminlte/about.html")


@api_view(('GET',))
def arcgisMapParametersDurhamRegion(request, stationid, dateselected):
    #stationid = request.GET.get('stationid')
    #dateselected = request.GET.get('dateselected')
    print(f"stationid----->{stationid} & dateselected ---> {dateselected}")
    if(stationid.startswith("0")):
        stationid = stationid[1:]
        print(f"station id in if----->{stationid}")
    col_list = ["DATE", "Chloride", "Population",
                "TotalPhosphorus", "TotalNitrogen", "STATION"]
    # masterdatafile = pd.read_csv("MasterData-2022-03-27.csv", usecols=col_list, sep = ",", header = 0, index_col = False)
    masterdatafile = pd.read_csv("MasterData-2022-03-27.csv", usecols=col_list, sep=",", dtype={
                                 "STATION": "string", "Chloride": float, "Population": "string", "TotalPhosphorus": float, "TotalNitrogen": float})
    masterdatafile.DATE = pd.to_datetime(
        masterdatafile.DATE, format='%b %d- %Y', infer_datetime_format=True)
    masterdatafile = masterdatafile[(masterdatafile['DATE'] > dateselected + "-01-01") & (masterdatafile['DATE']
                                                                                          < dateselected + "-12-31") & (masterdatafile['STATION'].str.contains(stationid) == True)].fillna(0)
    print(f"Exist or not--->{ masterdatafile.count().STATION} ")
    if(masterdatafile.count().STATION > 0):
        avgchloride = round(masterdatafile["Chloride"].mean(), 2)
        populationdata = masterdatafile["Population"].str.replace(
            ',', '').fillna(masterdatafile["Population"])
        avgpopulation = round(populationdata.apply(
            lambda x: float(x)).mean(), 2)
        avgphosphorus = round(masterdatafile["TotalPhosphorus"].mean(), 2)
        avgnitrogen = round(masterdatafile["TotalNitrogen"].mean(), 2)
        # print(totchloride)

        json_return = []
        # for index, row in uniquecolumnfile.iterrows():
        #     # print(f"Index : {index} row : {row[2]}")
        #     loopvalue = {"station":row[0], "latitude":row[1],"longitude":row[2]}
        #     json_return.append(loopvalue)
        # json_return = json.dumps(json_return)
        return Response({"status": "success", "avgchloride": avgchloride, "avgpopulation": avgpopulation, "avgphosphorus": avgphosphorus, "avgnitrogen": avgnitrogen, "stationid": stationid})
    else:
        return Response({"status": "notfound", "avgchloride": "NA", "avgpopulation": "NA", "avgphosphorus": "NA", "avgnitrogen": "NA", "stationid": stationid})


@api_view(('GET',))
def arcgisMapSoilDetailsAPI(request, stationid, dateselected):
    #stationid = request.GET.get('stationid')
    #dateselected = request.GET.get('dateselected')
    if(stationid.startswith("0")):
        stationid = stationid[1:]
    print(f"stationid----->{stationid}  dateselected------> {dateselected}")
    col_list = ["DATE", "DSS_ClaySiltSand_TCLAYwtd", "DSS_ClaySiltSand_TOTHERwtd", "DSS_ClaySiltSand_TSANDwtd", "DSS_ClaySiltSand_TSILTwtd", "DSS_ClaySiltSand_TUNKNOWNwtd", "STATION", "MeanTemp14dayMean", "MeanTemp1dayMean", "MeanTemp28dayMean", "MeanTemp3dayMean", "MeanTemp56dayMean", "MeanTemp7dayMean", "MeanTemp0dayMean",
                "TotalRain14dayTotal", "TotalRain1dayTotal", "TotalRain28dayTotal", "TotalRain3dayTotal", "TotalRain56dayTotal", "TotalRain7dayTotal", "TotalRain0dayTotal", "250mLandCover_Agricultural", "250mLandCover_Anthropogenic", "250mLandCover_Natural", "DrainageBasinArea_sqkm", "LandAreaSqkm", "Population", "Latitude", "Longitude"]
    masterdatafile = pd.read_csv("MasterData-2022-03-27.csv", usecols=col_list, sep=",", dtype={"STATION": "string", "DATE": "string", "DSS_ClaySiltSand_TCLAYwtd": float, "DSS_ClaySiltSand_TOTHERwtd": float, "DSS_ClaySiltSand_TSILTwtd": float, "DSS_ClaySiltSand_TUNKNOWNwtd": float, "MeanTemp14dayMean": float, "MeanTemp1dayMean": float, "MeanTemp28dayMean": float, "MeanTemp3dayMean": float, "MeanTemp56dayMean": float, "MeanTemp7dayMean": float,
                                 "MeanTemp0dayMean": float, "TotalRain14dayTotal": float, "TotalRain1dayTotal": float, "TotalRain28dayTotal": float, "TotalRain3dayTotal": float, "TotalRain56dayTotal": float, "TotalRain7dayTotal": float, "TotalRain0dayTotal": float, "250mLandCover_Agricultural": float, "250mLandCover_Anthropogenic": float, "250mLandCover_Natural": float, "DrainageBasinArea_sqkm": float, "LandAreaSqkm": float, "Population": "string", "Latitude": float, "Longitude": float})
    masterdatafile.DATE = pd.to_datetime(
        masterdatafile.DATE, format='%b %d- %Y', infer_datetime_format=True)
    masterdatafile = masterdatafile[(masterdatafile['DATE'] > dateselected + "-01-01") & (masterdatafile['DATE']
                                                                                          < dateselected + "-12-31") & (masterdatafile['STATION'].str.contains(stationid) == True)].fillna(0)
    print(masterdatafile)
    if(masterdatafile.count().STATION > 0):
        masterdatafile = masterdatafile.reset_index()
        totalTCLAYwtd = masterdatafile["DSS_ClaySiltSand_TCLAYwtd"].unique()
        totalTOTHERwtd = masterdatafile["DSS_ClaySiltSand_TOTHERwtd"].unique()
        totalTSANDwtd = masterdatafile["DSS_ClaySiltSand_TSANDwtd"].unique()
        totalTSILTwtd = masterdatafile["DSS_ClaySiltSand_TSILTwtd"].unique()
        totalTUNKNOWNwtd = masterdatafile["DSS_ClaySiltSand_TUNKNOWNwtd"].unique(
        )
        totalagricultural = masterdatafile["250mLandCover_Agricultural"].unique(
        )
        totalanthropogenic = masterdatafile["250mLandCover_Anthropogenic"].unique(
        )
        totalnatural = masterdatafile["250mLandCover_Natural"].unique()
        totaldrainagebasinsqkm = masterdatafile["DrainageBasinArea_sqkm"].unique(
        )
        totalareasqkm = masterdatafile["LandAreaSqkm"].unique()
        totalpopulation = masterdatafile["Population"].str.replace(
            ',', '').fillna(masterdatafile["Population"])
        latitude = masterdatafile["Latitude"].unique()
        longitude = masterdatafile["Longitude"].unique()
        longitudestring = str(longitude[0])
        print(longitudestring[1:])
        linegraphreturnlist = []
        bargraphRainfall = []
        for index, row in masterdatafile.iterrows():
            color = "%06x" % random.randint(0, 0xFFFFFF)
            json_string = {"data": [row["MeanTemp56dayMean"], row["MeanTemp28dayMean"], row["MeanTemp7dayMean"],
                                    row["MeanTemp3dayMean"], row["MeanTemp1dayMean"]], "borderColor": '#' + color, "fill": "false"}
            linegraphreturnlist.append(json_string)
            rainfalljsonstring = {"x": ["fiftysix", "twentyeight", "forteen", "seven", "three", "one", "zero"], "y": [row["TotalRain56dayTotal"], row["TotalRain28dayTotal"], row["TotalRain14dayTotal"],
                                                                                                                      row["TotalRain7dayTotal"], row["TotalRain3dayTotal"], row["TotalRain1dayTotal"], row["TotalRain0dayTotal"]], "type": 'bar', "name": pd.to_datetime(row["DATE"]).date()}
            bargraphRainfall.append(rainfalljsonstring)
            # print(row["MaxTemp14dayMean"], row["MaxTemp28dayMean"])
        print(linegraphreturnlist)
        # MaxTemp14dayMean = masterdatafile["MaxTemp14dayMean"].to_list()
        # "MaxTemp1dayMean", "MaxTemp28dayMean", "MaxTemp3dayMean", "MaxTemp56dayMean", "MaxTemp7dayMean", "MaxTemp0dayMean"
        print(f"totalclaywtd------>{totalTCLAYwtd}")
        return Response({"status": "success", "totalTCLAYwtd": totalTCLAYwtd, "totalTOTHERwtd": totalTOTHERwtd, "totalTSANDwtd": totalTSANDwtd, "totalTSILTwtd": totalTSILTwtd, "totalTUNKNOWNwtd": totalTUNKNOWNwtd, "linegraphreturnlist": linegraphreturnlist, "bargraphRainfall": bargraphRainfall, "totalagricultural": totalagricultural, "totalanthropogenic": totalanthropogenic, "totalnatural": totalnatural, "totaldrainagebasinsqkm": totaldrainagebasinsqkm, "totalareasqkm": totalareasqkm, "totalpopulation": totalpopulation[0], "latitude": latitude, "longitude": longitudestring[1:]})
    else:
        return Response({"status": "notfound"})


@api_view(('POST',))
def addNewUser(request):
    user = request.user
    status = "success"
    if request.method == "POST":
        emailaddress = request.POST['emailaddress']
        password = request.POST['password']
        displayusername = request.POST['displayusername']
        userregistration = UserRegistration()
        checkifuserexists = UserRegistration.objects.all().filter(
            user_name=emailaddress.strip()).count()
        checkifdisplayuserexists = UserRegistration.objects.all().filter(
            user_display=displayusername.strip()).count()
        if checkifuserexists == 0 and checkifdisplayuserexists == 0:
            userregistration.user_name = emailaddress.strip()
            userregistration.user_password = password.strip()
            userregistration.user_display = displayusername.strip()
            userregistration.save()
        elif(checkifuserexists > 0):
            status = "useremailexists"
        elif(checkifdisplayuserexists > 0):
            status = "displayuserexists"
        else:
            status = "exists"
    return Response({"status": status})


@api_view(('POST',))
def loginUsingUserCredentials(request):
    status = "success"
    if request.method == "POST":
        emailaddress = request.POST['emailaddress']
        password = request.POST['password']
        print(f"Username: {emailaddress} password : {password}")
        checkifuserexists = 0
        if "@" in emailaddress:
            checkifuserexists = UserRegistration.objects.all().filter(
                user_name=emailaddress.strip()).filter(user_password=password.strip()).count()
        else:
            checkifuserexists = UserRegistration.objects.all().filter(
                user_display=emailaddress.strip()).filter(user_password=password.strip()).count()
        print(f"checkifuserexists: {checkifuserexists}")
        if checkifuserexists == 0:
            status = "notfound"
        else:
            # Owner.objects.only('owner_id').get(owner_name=owner_name).owner_id
            userid = 0
            username = ""
            if "@" in emailaddress:
                userid = UserRegistration.objects.only("user_id").get(
                    user_name=emailaddress.strip()).user_id  # get the induvidual userid
                username = UserRegistration.objects.only("user_name").get(
                    user_name=emailaddress.strip()).user_name
            else:
                userid = UserRegistration.objects.only("user_id").get(
                    user_display=emailaddress.strip()).user_id  # get the induvidual userid
                username = UserRegistration.objects.only("user_name").get(
                    user_display=emailaddress.strip()).user_name
            print(f"userid------->{userid} and username is ----- {username}")
            request.session['username'] = username
            request.session['userid'] = userid
    return Response({"status": status})


def login_after(request):
    username = ""
    print("I am here")

    if request.session.has_key('username'):
        print("I am inside if")
        username = request.session['username']
        print(f"The username is----->{username}")
        # request.session['username'] = username
    return render(request, "adminlte/landing.html", {"username": username})


@api_view(('POST',))
def save_file(request):
    try:
        if request.method == 'POST':
            # if fs.exists(name):
            # os.remove(os.path.join(settings.MEDIA_ROOT, name))
            print("in save file")
            uploaded_file = request.FILES['fileInput']
            fs = FileSystemStorage()
            if os.path.isfile('adminlte3/static/admin-lte/assets/uploaded_data/user_uploaded_csv_file.csv'):
                fs.delete(
                    'adminlte3/static/admin-lte/assets/uploaded_data/user_uploaded_csv_file.csv')
            name = fs.save(
                'adminlte3/static/admin-lte/assets/uploaded_data/user_uploaded_csv_file.csv', uploaded_file)
            print("Filename: ", name)
            print("File uploaded")
            uploaded_csv = pd.read_csv(name)
            csv_shape = uploaded_csv.shape
            null_values = uploaded_csv.isna().sum().sum()
            print(csv_shape, null_values)
            status = "saved"
            return Response({"status": status})
    except Exception:
        error = "Please select file!"
        print(error)
        return Response({'status': error})


@api_view(('POST',))
def validateUploadedFile(request):
    print(request.POST['data'])
    radiotype = request.POST['selectedradioinput']
    print(f"radiotype------->" + radiotype)
    df = pd.read_csv(
        'adminlte3/static/admin-lte/assets/uploaded_data/user_uploaded_csv_file.csv')
    shapevalue = df.shape
    nullvalues = df.isna().sum().sum()
    cols = df.shape[1]
    modeloptionforphosphorusmodel = 0
    if set(['Total Rain (mm) -7day Total', 'Nitrate', 'TotalNitrogen']).issubset(df.columns):
        print("I am here")
        modeloptionforphosphorusmodel = 1
    shapemodeldescription = {
        "status": "warn", "message": "Warning!!! Shape of the excel file might effect the model prediction.", "shapegenerated": 0}
    if modeloptionforphosphorusmodel == 0 and radiotype == "tp":
        shapemodeldescription = {
            "status": "success", "message": "Total Phosphorous with 8 features", "shapegenerated": cols}
    elif modeloptionforphosphorusmodel == 1 and radiotype == "tp":
        shapemodeldescription = {
            "status": "success", "message": "Total Phosphorous with 11 features", "shapegenerated": cols}
    elif radiotype == "tn":
        shapemodeldescription = {
            "status": "success", "message": "Total Nitrogen with 10 features", "shapegenerated": cols}
    return Response({'nullvalues': nullvalues, 'shapevalue': shapevalue, 'shapedecision': shapemodeldescription})

# @api_view(('POST',))
# def analysisFilterData(request):
#     print("analysisFilterData called......")
#     yearFrom = request.POST['yearFrom']
#     yearTo = request.POST['yearTo']

#     return Response({'status':'ok...'})


@api_view(('GET',))
def prediction(request, radioitem):
    # 1 - total phosphorus 2 - total nitrogen
    # a = request.POST['feature']
    x = time.time()
    timestamp = x
    date_time = datetime.fromtimestamp(timestamp)
    studydonetime = date_time.strftime("%d %B, %Y %H:%M:%S")
    file_path = 'adminlte3/static/admin-lte/assets/uploaded_data/user_uploaded_csv_file.csv'
    test_df = pd.read_csv(file_path)
    cols = test_df.shape[1]
    modeloptionforphosphorusmodel = 0
    if set(['Total Rain (mm) -7day Total', 'Nitrate', 'TotalNitrogen']).issubset(test_df.columns):
        print("I am here")
        modeloptionforphosphorusmodel = 1

    returnstatus = "error"
    modelselectedforanalysis = ""
    print(f"Test shape -------> {test_df.shape[1]}")
    studydonefor = ""
    if radioitem == "tp":
        studydonefor = "Total Phosphorus"
    else:
        studydonefor = "Total Nitrogen"

    # implementing validation
    if (test_df.shape[1] > 20):  # or (test_df.shape[1] != 5):
        error_msg = "File does not contain required features!"
        # fs.delete(name)
        print("Invelid file deleted")
        return Response({'error': error_msg})
        # Todo
        # Create console log using js

    else:
        if modeloptionforphosphorusmodel == 0 and radioitem == 'tp':
            modelselectedforanalysis = "TotalPhosphorus-RF-8F"
            returnstatus = "success"
            model_xg_1 = pickle.load(
                open(r'/home/disha/Downloads/TotalPhosphorous-RF-8.sav', 'rb'))
            test_df_ = test_df[['pH', '250mLandCover_Natural', 'DissolvedOxygen',
                                'Population', 'Chloride',
                                'Nitrite', 'TotalSuspendedSolids',
                                'Nitrogen_Kjeldahl']]
            sc = StandardScaler().fit(test_df_)
            test_df_ = sc.transform(test_df_)
            df_pred = model_xg_1.predict(test_df_)
            df_pred = pd.DataFrame(df_pred)
            df_pred.to_csv("pred.csv", index=False)
            print("File saved TotalPhosphorus I, prediction generated")
            # Merging with test dataset
            df_pred.columns = ['TotalPhosphorus']
            new_pred = pd.concat(
                [test_df, df_pred.reindex(test_df.index)], axis=1)
            new_pred.head()
            new_pred.to_csv(
                "data/Latest_predictions/predicted_phosphorus.csv", index=False)
            new_pred.to_csv(
                "data/Latest_predictions/recently_predicted.csv", index=False)
            new_pred.to_csv(
                "adminlte3/static/admin-lte/dist/js/data/recently_predicted.csv", index=False)
            context = {'file_ready': "File is ready to download."}

        if modeloptionforphosphorusmodel == 1 and radioitem == 'tp':
            modelselectedforanalysis = "TotalPhosphorus-RF-11"
            returnstatus = "success"
            model = pickle.load(
                open(r'/home/disha/Downloads/TotalPhosphorous-RF-11.sav', 'rb'))
            print(test_df.columns)
            test_df_ = test_df[['pH', '250mLandCover_Natural', 'DissolvedOxygen',
                                'Total Rain (mm) -7day Total', 'Population', 'Nitrate', 'Chloride',
                                'Nitrite', 'TotalNitrogen', 'TotalSuspendedSolids',
                                'Nitrogen_Kjeldahl']].copy()
            sc = StandardScaler().fit(test_df_)
            test_df_ = sc.transform(test_df_)
            df_pred = model.predict(test_df_)
            df_pred = pd.DataFrame(df_pred)
            df_pred.to_csv("pred.csv", index=False)
            print("File saved RF, prediction generated")
            # Merging with test dataset
            df_pred.columns = ['TotalPhosphorus']
            new_pred = pd.concat(
                [test_df, df_pred.reindex(test_df.index)], axis=1)
            new_pred.head()
            new_pred.to_csv(
                "data/Latest_predictions/predicted_phosphorous.csv", index=False)
            new_pred.to_csv(
                "data/Latest_predictions/recently_predicted.csv", index=False)
            new_pred.to_csv(
                "adminlte3/static/admin-lte/dist/js/predicted_phosphorous.csv", index=False)
            new_pred.to_csv(
                "adminlte3/static/admin-lte/dist/js/data/recently_predicted.csv", index=False)
            context = {'file_ready': "File is ready to download."}

        if radioitem == 'tn':
            modelselectedforanalysis = "TotalNitrogen-RF-10F"
            returnstatus = "success"
            model = pickle.load(
                open(r'/home/disha/Downloads/TotalNitrogen-RF-10.sav', 'rb'))
            test_df_ = test_df[['Month', 'pH', 'Population', '10mLandCover_Natural', '10mLandCover_AnthropogenicNatural',
                                'TotalSuspendedSolids', 'Conductivity', 'TotalPhosphorus', 'Chloride', 'Nitrate']]
            sc = StandardScaler().fit(test_df_)
            test_df_ = sc.transform(test_df_)
            df_pred = model.predict(test_df_)
            df_pred = pd.DataFrame(df_pred)
            df_pred.to_csv("pred.csv", index=False)
            print("File saved RF, prediction generated For N")
            # Merging with test dataset
            df_pred.columns = ['TotalNitrogen']
            new_pred = pd.concat(
                [test_df, df_pred.reindex(test_df.index)], axis=1)
            new_pred.head()
            new_pred.to_csv(
                "data/Latest_predictions/predicted_Nitrogen.csv", index=False)
            new_pred.to_csv(
                "data/Latest_predictions/recently_predicted.csv", index=False)
            new_pred.to_csv(
                "adminlte3/static/admin-lte/dist/js/predicted_Nitrogen.csv", index=False)
            new_pred.to_csv(
                "adminlte3/static/admin-lte/dist/js/data/recently_predicted.csv", index=False)
            context = {'file_ready': "File is ready to download."}

        def hms(seconds):
            h = seconds // 3600
            m = seconds % 3600 // 60
            s = seconds % 3600 % 60
            return '{:02d} hours {:02d} minutes {:02d} seconds'.format(h, m, s)

    print(f"feature-------------{radioitem}")
    totaltimetakenformodel = hms(math.trunc(round((time.time() - x), 2)))
    return Response({'status': returnstatus, "returncol": cols, "modelselectedforanalysis": modelselectedforanalysis, "studydonefor": studydonefor, "studydonetime": studydonetime, "totaltimetakenformodel": totaltimetakenformodel})


def download_predictedfile(request):
    filename = "adminlte3/static/admin-lte/dist/js/data/recently_predicted.csv"
    response = FileResponse(open(filename, 'rb'))
    return response


def dextarity(request):
    yearslected = "2017"
    col_list = ["STATION", "Latitude", "Longitude",
                "DATE", "TotalPhosphorus", "TotalNitrogen"]
    masterdatafile = pd.read_csv(
        "MasterData-2022-03-27.csv", usecols=col_list, sep=",")
    masterdatafile.DATE = pd.to_datetime(
        masterdatafile.DATE, format='%b %d- %Y', infer_datetime_format=True)
    masterdatafile = masterdatafile[(masterdatafile['DATE'] > yearslected + "-01-01") & (
        masterdatafile['DATE'] < yearslected + "-12-31")].fillna(0)
    if(masterdatafile.count().STATION > 0):
        avgphosphorus = round(masterdatafile["TotalPhosphorus"].mean(), 2)
        avgnitrogen = round(masterdatafile["TotalNitrogen"].mean(), 2)
    stationiconlink = "normalregion.png"
    # if avgphosphorus > 0.02 or avgnitrogen > 10:
    #     stationiconlink = "star.png"

    masterdatafile = masterdatafile.drop(columns=['DATE'])
    uniquecolumnfile = masterdatafile.drop_duplicates()
    print(uniquecolumnfile)
    json_return = []
    stationforloop = ""
    phosphorusnumber = 0
    nitrogernnumber = 0
    for index, row in uniquecolumnfile.iterrows():
        if stationforloop != row[0]:
            filterhotspots = uniquecolumnfile[(
                uniquecolumnfile["STATION"] == row[0])]
            if(filterhotspots.count().STATION > 0):
                phosphorusnumber = round(
                    filterhotspots["TotalPhosphorus"].mean(), 2)
                nitrogernnumber = round(
                    filterhotspots["TotalNitrogen"].mean(), 2)
                if phosphorusnumber > 0.05 or nitrogernnumber > 10:
                    stationiconlink = "hotspot.png"
            # print(f"stationid-----> {row[0]} nitrogen ----> {nitrogernnumber}  phosphrusnumber -----> {phosphorusnumber}")
        stationforloop = row[0]
        # masterdatafileduplicate = masterdatafileduplicate[(masterdatafileduplicate['DATE'] > yearslected + "-01-01") & (masterdatafileduplicate['DATE'] < yearslected + "-12-31") & (masterdatafileduplicate['STATION'] == row[0])].fillna(0)
        # print(f"{masterdatafileduplicate}")
        # avgphosphorus = 0
        # avgnitrogen = 0
        # if(masterdatafile.count().STATION > 0):
        #     avgphosphorus = round(masterdatafile["TotalPhosphorus"].mean(),2)
        #     avgnitrogen = round(masterdatafile["TotalNitrogen"].mean(),2)
        # stationiconlink = "star.png"
        # if avgphosphorus > 0.02 or avgnitrogen > 10:
        #     stationiconlink = "star.png"
        loopvalue = {"station": row[0], "latitude": row[1],
                     "longitude": row[2], "stationiconlink": stationiconlink}
        json_return.append(loopvalue)
    print(f"Year selected: {yearslected}")
    json_return = json.dumps(json_return)
    regiondemographicrenderurl = "https://services.arcgis.com/t0XyVE44waBIPBFr/arcgis/rest/services/trca_landuse_naturalcover_2017shp/FeatureServer/0"
    return render(request, "adminlte/dexterity.html", {"jsonvalue": json_return, "regiondemographicrenderurl": regiondemographicrenderurl, "yearselected": yearslected})


def in_dex(request):
    return render(request, "adminlte/in_dex.html")


def contact_us(request):
    return render(request, "adminlte/contact_us.html")


def new_dashboard(request):
    return render(request, "adminlte/new_dashboard.html")


def features(request):
    return render(request, "adminlte/features.html")


def describe(request, year):
    yearslected = year
    # yearslected = request.GET.get('yearid')
    # create map

    if yearslected == "":
        yearslected = "2017"
    col_list = ["STATION", "Latitude", "Longitude",
                "DATE", "TotalPhosphorus", "TotalNitrogen"]
    masterdatafile = pd.read_csv(
        "MasterData-2022-03-27.csv", usecols=col_list, sep=",")
    masterdatafile.DATE = pd.to_datetime(
        masterdatafile.DATE, format='%b %d- %Y', infer_datetime_format=True)
    masterdatafile = masterdatafile[(masterdatafile['DATE'] > yearslected + "-01-01") & (
        masterdatafile['DATE'] < yearslected + "-12-31")].fillna(0)
    if(masterdatafile.count().STATION > 0):
        avgphosphorus = round(masterdatafile["TotalPhosphorus"].mean(), 2)
        avgnitrogen = round(masterdatafile["TotalNitrogen"].mean(), 2)
    stationiconlink = "normalregion.png"
    # if avgphosphorus > 0.02 or avgnitrogen > 10:
    #     stationiconlink = "star.png"

    masterdatafile = masterdatafile.drop(columns=['DATE'])
    uniquecolumnfile = masterdatafile.drop_duplicates()
    print(uniquecolumnfile)
    json_return = []
    stationforloop = ""
    phosphorusnumber = 0
    nitrogernnumber = 0
    for index, row in uniquecolumnfile.iterrows():
        if stationforloop != row[0]:
            filterhotspots = uniquecolumnfile[(
                uniquecolumnfile["STATION"] == row[0])]
            if(filterhotspots.count().STATION > 0):
                phosphorusnumber = round(
                    filterhotspots["TotalPhosphorus"].mean(), 2)
                nitrogernnumber = round(
                    filterhotspots["TotalNitrogen"].mean(), 2)
                if phosphorusnumber > 0.05 or nitrogernnumber > 10:
                    stationiconlink = "hotspot.png"
            # print(f"stationid-----> {row[0]} nitrogen ----> {nitrogernnumber}  phosphrusnumber -----> {phosphorusnumber}")
        stationforloop = row[0]
        # masterdatafileduplicate = masterdatafileduplicate[(masterdatafileduplicate['DATE'] > yearslected + "-01-01") & (masterdatafileduplicate['DATE'] < yearslected + "-12-31") & (masterdatafileduplicate['STATION'] == row[0])].fillna(0)
        # print(f"{masterdatafileduplicate}")
        # avgphosphorus = 0
        # avgnitrogen = 0
        # if(masterdatafile.count().STATION > 0):
        #     avgphosphorus = round(masterdatafile["TotalPhosphorus"].mean(),2)
        #     avgnitrogen = round(masterdatafile["TotalNitrogen"].mean(),2)
        # stationiconlink = "star.png"
        # if avgphosphorus > 0.02 or avgnitrogen > 10:
        #     stationiconlink = "star.png"
        loopvalue = {"station": row[0], "latitude": row[1],
                     "longitude": row[2], "stationiconlink": stationiconlink}
        json_return.append(loopvalue)
    print(f"Year selected: {yearslected}")
    json_return = json.dumps(json_return)
    regiondemographicrenderurl = ""
    if yearslected == "2017":
        regiondemographicrenderurl = "https://services.arcgis.com/t0XyVE44waBIPBFr/arcgis/rest/services/trca_landuse_naturalcover_2017shp/FeatureServer/0"
    elif yearslected == "2013":
        regiondemographicrenderurl = "https://services.arcgis.com/t0XyVE44waBIPBFr/arcgis/rest/services/habitat_2013_trcashp/FeatureServer/0"
    elif yearslected == "2007" or yearslected == "2008":
        regiondemographicrenderurl = "https://services.arcgis.com/t0XyVE44waBIPBFr/arcgis/rest/services/habitat_2007_2008_trcashp/FeatureServer/0"
    elif yearslected == "2002":
        regiondemographicrenderurl = "https://services.arcgis.com/t0XyVE44waBIPBFr/arcgis/rest/services/habitat_2002_trcashp/FeatureServer/0"
    # print(json_return)
    # context = plotMap(featuresSelected)
    return render(request, "adminlte/describe.html", {"jsonvalue": json_return, "regiondemographicrenderurl": regiondemographicrenderurl, "yearselected": yearslected})


def new_analysis(request):
    return render(request, "adminlte/new_analysis.html")


def new_predict(request):
    return render(request, "adminlte/predict.html")


def preprocessing(df_, station_, predictVar):
    #df_ = df_.dropna()
    print("------------in preprocessing", df_.shape)
    print(station_, predictVar)

    # To select Phosphorus columns
    if predictVar == 'TP':
        selected_cols_ = ['Year', 'pH', 'Natural Land 250m (ha)', 'Dissolved Oxygen (mg/L)',  'Total Rain (mm) -7day Total',
                          'Population', 'Nitrate (mg/L)', 'Chloride (mg/L)', 'Nitrite (mg/L)', 'Total Nitrogen (mg/L)',
                          'Total Suspended Solids (mg/L)', 'Nitrogen Kjeldahl (mg/L)', 'Total Phosphorus (mg/L)']
    # To select Nitrogen columns
    if predictVar == 'TN':
        selected_cols_ = ['Year',
                          'pH', 'Month', 'Population', 'Natural Land 10m (ha)', 'Anthropogenic Natural Land 10m (ha)',
                          'Total Suspended Solids (mg/L)', 'Conductivity (K)', 'Total Phosphorus (mg/L)',
                          'Chloride (mg/L)', 'Nitrate (mg/L)', 'Total Nitrogen (mg/L)']

    df_ = df_[df_['Station'] == station_]  # 6009701102]
    df_ = df_[selected_cols_]
    df_ = df_.dropna()
    df_ = df_.reset_index().groupby('Year').mean()
    df_ = df_.drop(['index'], axis=1)
    print('Processing', df_.shape[0], 'Records,',
          df_.shape[1], 'Features', 'of', station_, 'Station ID')
    return df_


def load_model(model_path):
    with open(model_path, 'rb') as file:
        Pickled_LR_Model = pickle.load(file)
    return Pickled_LR_Model


def predict_(model_, X_test):
    sc = StandardScaler().fit(X_test)
    X_test = sc.transform(X_test)

    y_test_pred = model_.predict(X_test)
    return y_test_pred


def plotUserData2(x1, y1, x2, y2, target_param, rmse, mse, r2, station_, path):
    plt.figure(figsize=(20, 5))

    plt.plot(x1, y1, color='blue', label=target_param)
    plt.scatter(x1, y1, color='blue')

    plt.plot(x2, y2, color='orange', label='Predicted '+target_param)
    plt.scatter(x2, y2, color='orange')

    # naming the x axis
    plt.xlabel('Year', fontsize='14')
    # naming the y axis
    plt.ylabel(target_param, fontsize='14')

    # giving a title to my graph
    if rmse != "":
        title = 'Year Vs '+target_param+" ("+str(station_)+")"+"[RMSE = "+str(
            round(rmse, 3))+": MSE = "+str(round(mse, 3))+": R2 = "+str(round(r2, 2))+"]"
    else:
        title = 'Year Vs '+target_param+" ("+str(station_)+")"
    plt.title(title, fontsize='14')
    plt.legend()  # loc='lower left')

    if "/" in target_param:
        target_param = target_param.replace("/", "_Per_")
    # function to show the plot
    plt.savefig('data/Latest_predictions/'+str(station_)+".png")
    plt.savefig("adminlte3/static/admin-lte/dist/js/data/" +
                str(station_)+".png")
#   plt.show()

# Start Year should be > 2020


def lstm(df_, predictVar, station_, model_path, year_strt, year_end, isTest):
    print("-------In lstm------------")
    print(df_.shape, "predictVat", predictVar, station_,
          model_path, year_strt, year_end, isTest)

    target_param_path = ""
    if predictVar == 'TP':
        target_param = "Total Phosphorus (mg/L)"
        target_param_path = "TotalPhosphorus"
    else:
        target_param = "Total Nitrogen (mg/L)"
        target_param_path = "TotalNitrogen"

    if os.path.exists('data/Latest_predictions'+str(station_)) == False:
        os.mkdir('data/Latest_predictions'+str(station_))

    # Pre-processing master data
    df_ = preprocessing(df_, station_, predictVar)
    if df_.shape[0] <= 0:
        print("No record(s) found for Station ID =", station_,
              '\nPlease try again with another Station ID')
        return "No record(s) found for Station ID =", station_, '\nPlease try again with another Station ID'

    df_ = df_.reset_index()

    # To create new dataframe with the user selected years
    df_new = pd.DataFrame(columns=df_.columns)

    # Getting last record value from historical dataframe
    last_col_val = df_.iloc[-1:]
    #second_last_col_val = df_.iloc[-2]

    # Temporary dictionary to store the each year synthetic generated value until the data is stored in dataframe
    temp_dict = {}

    df_hist = df_[['Year', target_param]]

    df_['Day'] = 31
    df_['Month'] = 12
    df_['Date'] = pd.to_datetime(df_[["Year", "Month", "Day"]])
    df_ = df_.drop(['Day', 'Year'], axis=1)
    if predictVar == 'TP':
        df_ = df_.drop('Month', axis=1)
    # display(df_)

    Pickled_LR_Model = load_model(model_path)

    error_df = pd.DataFrame(columns=['Parameter', 'RMSE', 'MSE'])
    if isTest == True:
        if os.path.exists('data/Latest_predictions/'+str(station_)+'/Test') == False:
            os.mkdir('data/Latest_predictions/'+str(station_)+'/Test')

        if os.path.exists('data/Latest_predictions/'+str(station_)+'/Test/Individual_Params') == False:
            os.mkdir('data/Latest_predictions/' +
                     str(station_)+'/Test/Individual_Params')

        if os.path.exists('data/Latest_predictions/'+str(station_)+'/Test/Target_Param') == False:
            os.mkdir('data/Latest_predictions/' +
                     str(station_)+'/Test/Target_Param')

        for col in df_.iloc[:, :-1].columns:
            X_train, X_test, y_train, y_test = train_test_split(
                df_[['Date']], df_[[col]], test_size=0.33, shuffle=False)
            # print(col)
            df_train = pd.merge(
                X_train, y_train, left_index=True, right_index=True)
            df_train = df_train.rename(columns={'Date': 'ds', col: 'y'})

            df_test = pd.merge(
                X_test, y_test, left_index=True, right_index=True)

            X_test = X_test.rename(columns={'Date': 'ds'})

            scaler = MinMaxScaler(feature_range=(0, 1))
            X_train_2 = scaler.fit_transform(X_train)
            X_test_2 = scaler.fit_transform(X_test)

            look_back = 1

            model = Sequential()
            model.add(LSTM(4, input_shape=(1, look_back)))
            # look_back = 1
            # batch_size = 1

            # model = Sequential()
            # model.add(LSTM(4, batch_input_shape=(batch_size, look_back,1), stateful=True, return_sequences=True))
            # model.add(LSTM(4, batch_input_shape=(batch_size, look_back,1), stateful=True))
            # model.add(LSTM(4, batch_input_shape=(batch_size, look_back, 1), stateful=True))
            model.add(Dense(1))
            model.compile(loss='mean_squared_error', optimizer='adam')
            model.fit(X_train_2, y_train, epochs=100, batch_size=1, verbose=0)

            forecast = model.predict(X_test_2)
            print(col, 'Parameter Prophet Metrics:')
            mse, rmse, r2 = results_(
                y_test, forecast, col, "", station_, False)

            error_df = error_df.append(
                {'Parameter': col, 'RMSE': rmse, 'MSE': mse}, ignore_index=True)
            plotUserData2(df_[['Date']], df_[[col]], X_test, forecast,
                          col, rmse, mse, r2, station_, 'Test/Individual_Params/')

        error_df.to_csv(BASEDIR+'Predicted_Charts/Prediction-Risk-Analysis/LSTM/' +
                        str(station_)+'/Test/Individual_Params/error_metrics.csv', index=False)

        X_train, X_test, y_train, y_test = train_test_split(df_.drop([target_param], axis=1),
                                                            df_[[target_param]], test_size=0.33, shuffle=False)

        # display(error_df)
        test_dates = X_test[['Date']]
        X_test = X_test.drop(['Date'], axis=1)
        print(X_test.columns)
        Y_pred = predict_(Pickled_LR_Model, X_test)
        rf_train_mse, rf_train_rmse, r2 = results_(
            y_test, Y_pred, target_param, target_param_path, station_, True)

        plotUserData2(df_[['Date']], df_[[target_param]], test_dates, Y_pred, target_param,
                      rf_train_rmse, rf_train_mse, r2, station_, 'Test/Target_Param/')
    else:

        # TO Save the Plotted the charts & Error Metrix
        # if os.path.exists('data/Latest_predictions/temp/'+str(station_)+'/Predict') == False:
        #   os.mkdir('data/Latest_predictions/temp/'+str(station_)+'/Predict')

        # if os.path.exists('data/Latest_predictions/temp/'+str(station_)+'/Predict/Individual_Params') == False:
        #   os.mkdir('data/Latest_predictions/temp/'+str(station_)+'/Predict/Individual_Params')

        # if os.path.exists('data/Latest_predictions/temp'+str(station_)+'/Predict/Target_Param') == False:
        #   os.mkdir('data/Latest_predictions/temp/'+str(station_)+'/Predict/Target_Param')

        # Looping over user selected years
        temp_dict['Year'] = [year_ for year_ in range(year_strt, year_end+1)]

        df_pred = pd.DataFrame(temp_dict)

        df_2 = pd.DataFrame(temp_dict)
        df_2['Day'] = 31
        df_2['Month'] = 12
        df_2['Date'] = pd.to_datetime(df_2[["Year", "Month", "Day"]])
        df_2 = df_2.drop(['Day', 'Year'], axis=1)

        if predictVar == 'TP':
            df_2 = df_2.drop('Month', axis=1)

        for col in df_.columns:
            if col != 'Year' and col != target_param and col != 'Date':
                X_train = df_[['Date']]
                y_train = df_[[col]]

                df_test = df_2
                X_test = df_test[['Date']]

                scaler = MinMaxScaler(feature_range=(0, 1))
                X_train_2 = scaler.fit_transform(X_train)
                X_test_2 = scaler.fit_transform(X_test)

                look_back = 1

                model = Sequential()
                model.add(LSTM(4, input_shape=(1, look_back)))

                # batch_size = 1
                # look_back = 1
                # model = Sequential()
                # model.add(LSTM(4, batch_input_shape=(batch_size, look_back), stateful=True, return_sequences=True))
                # model.add(LSTM(4, batch_input_shape=(batch_size, look_back), stateful=True))
                # model.add(LSTM(4, batch_input_shape=(batch_size, look_back), stateful=True))

                model.add(Dense(1))
                model.compile(loss='mean_squared_error', optimizer='adam')
                model.fit(X_train_2, y_train, epochs=100,
                          batch_size=1, verbose=0)

                df_2[col] = model.predict(X_test_2)

                plotUserData2(df_[['Date']], df_[[col]], df_2[['Date']], df_2[[col]], col,
                              "", "", "", station_, 'data/Latest_predictions/')

        dates = df_2[['Date']]
        df_2 = df_2.drop(['Date'], axis=1)
        Y_pred = predict_(Pickled_LR_Model, df_2)
        # rf_train_mse, rf_train_rmse, train_acc, test_acc = results_(Pickled_LR_Model, X_train.drop(['Year'], axis=1), y_train,
        #                                                             X_test.drop(['Year'], axis=1), y_test, Y_pred)

        df_2[target_param] = Y_pred
        df_pred[target_param] = Y_pred
        print("df_all.........................")
        df_all = pd.concat([df_hist, df_pred], ignore_index=True)
        print(df_all.columns)
        # df_2.to_csv("data/Latest_predictions/temp/"+station_+"predicted.csv")
        df_2.to_csv("adminlte3/static/admin-lte/dist/js/data/" +
                    station_+"predicted.csv")
        print(df_2.head())
        print(df_2.shape)
        print(df_2.columns)
        # print(y_test, Y_pred)
        # display(df_2)

        # bigdata = df_new.append(df_[(df_['Year']<year_strt)], ignore_index=True).sort_values(by=['Year'])
        plotUserData2(df_[['Date']], df_[[target_param]], dates, df_2[target_param], target_param,
                      "", "", "", station_, 'Predict/Target_Param/')

    return df_[['Date']], df_[[target_param]], dates, df_2[target_param], target_param, station_


def results_(y_test_, Y_pred, target_param, target_param_path, station_, isSave):
    # Calculating MSE and RMSE
    rf_train_mse = mean_squared_error(y_test_, Y_pred)
    rf_train_rmse = np.sqrt(rf_train_mse)
    r2_ = r2_score(y_test_, Y_pred)*100
    if isSave:
        y_test_.to_csv(BASEDIR+"Predicted_Charts/Prediction-Risk-Analysis/LSTM/"+str(
            station_)+"/Test/Target_Param/"+"test_"+target_param_path+".csv", index=False)
        Y_pred = pd.DataFrame(Y_pred, columns=['Predicted '+target_param])
        Y_pred.to_csv(BASEDIR+"Predicted_Charts/Prediction-Risk-Analysis/LSTM/"+str(station_) +
                      "/Test/Target_Param/"+"predicted_"+target_param_path+".csv", index=False)
    print("Mean squared error: %.2f" % rf_train_mse)
    print("Root Mean Squared error: %.2f" % rf_train_rmse)
    print('R2 Score: %.2f' % r2_)

    return rf_train_mse, rf_train_rmse, r2_


@api_view(('GET',))
def getPredictionOutput(request, selected, station, yearFrom, yearTo):
    yearFrom = int(yearFrom)
    yearTo = int(yearTo)
    # selected = (request.GET['selected'])
    # station = request.GET['station']
    print(yearFrom, yearTo, selected, station)
    if selected == 'TP':
        model_path = "/home/disha/Downloads/TotalPhosphorous-RF-11.sav" #ml_models/
        # model_path = "ml_models/TotalPhosphorous-RF-11.sav"
    else:
        model_path = "/home/disha/Downloads/TotalNitrogen-RF-10F.sav"
        # model_path = "ml_models/TotalNitrogen-RF-10F.sav"

    print(model_path)
    print(type(yearFrom))
    print(type(yearTo))
    df = pd.read_csv(
        "https://raw.githubusercontent.com/DishaCoder/CSV/main/Predict-Prescribe-Data.csv")
    print("in getPredictionOutput, shape of df passing is === ", df.shape)
    try:
        hist_date, hist_param, fut_date, fut_param, target_param, station_ = lstm(
            df, selected, station, model_path, yearFrom, yearTo, False)
        print(hist_date, fut_date)
        # hist_date['Date'] = pd.to_datetime(hist_date['Date'],format='%Y%m%d')
        # hist_date['Year'] = pd.DatetimeIndex(hist_date['Date']).year
        # print("year:::", hist_date['Year'])
        return Response({'status': 'Got it', 'hist_date': hist_date, 'hist_param': hist_param, 'fut_date': fut_date, 'fut_param': fut_param, 'target_param': target_param, 'station_': station_})

    except ValueError:
        dataset_error = lstm(df, selected, station,
                             model_path, yearFrom, yearTo, False)
        return Response({'dataset_error': dataset_error})


def prescribe(request):
    return render(request, "adminlte/prescribe.html")


# ------------------------prescribe page----------------------------------------
def preprocessing2(df_, station_, isPhos_):
    df_ = df_.dropna()

    # To select Phosphorus columns
    if isPhos_ == True:
        selected_cols_ = ['pH', 'Natural Land 250m (ha)', 'Dissolved Oxygen (mg/L)',  'Total Rain (mm) -7day Total',
                          'Population', 'Nitrate (mg/L)', 'Chloride (mg/L)', 'Nitrite (mg/L)', 'Total Nitrogen (mg/L)',
                          'Total Suspended Solids (mg/L)', 'Nitrogen Kjeldahl (mg/L)']
    # To select Nitrogen columns
    else:
        selected_cols_ = ['pH', 'Month', 'Population', 'Natural Land 10m (ha)', 'Anthropogenic Natural Land 10m (ha)',
                          'Total Suspended Solids (mg/L)', 'Conductivity (K)', 'Total Phosphorus (mg/L)',
                          'Chloride (mg/L)', 'Nitrate (mg/L)']

    # df_ = df_[df_['Station']==station_]#6009701102]
    df_ = df_.reset_index().groupby('Year').mean()
    df_ = df_.reset_index()
    print('Selected Station historical recorded years:', df_.Year.unique())
    df_ = df_[selected_cols_]
    df_ = df_.dropna()
    # display(df_)
    return df_


def percentage(val, by, isFloat=False):
    if isFloat:
        return float(by * float(val)/float(100))
    else:
        return round(by * float(val)/float(100), 0)


def isfloat(num):
    try:
        float(num)
        return True
    except ValueError:
        return False


def sensitivityScenarioAnalysis(df_, param, percentages):
    count = 0
    df_temp = pd.DataFrame(columns=df_.columns)
    last_col_val = df_.tail(1)  # iloc[-1]
#   display(last_col_val)

    df_temp = pd.concat([last_col_val]*len(percentages))
    df_temp = df_temp.reset_index()
    df_temp = df_temp.drop(['index'], axis=1)

    for val_per in percentages:
        val_ = last_col_val[param].apply(
            lambda x: percentage(x, 100+val_per, True)).values[0]
        df_temp.loc[count, [param]] = val_
        count += 1

#   display(df_temp)
    return df_temp


def updateValue(last_col_val, param, percentages):
    last_val = last_col_val[param]
    print('Last Value of', param, '=', last_val)
    last_col_val[param] = percentage(last_val, percentages, isfloat(last_val))

    if percentages < 0:
        print("Value decreased by", percentages, '%')
    else:
        print("Value increased by", percentages, '%')
    print('Updated Value of', param, '=', last_col_val[param])
    return last_col_val


def load_model(model_path):
    with open(model_path, 'rb') as file:
        Pickled_LR_Model = pickle.load(file)
    return Pickled_LR_Model


def predict_(model_, X_test):
    sc = StandardScaler().fit(X_test)
    X_test = sc.transform(X_test)
    y_pred = model_.predict(X_test)
    return y_pred


def plotUserData(big_data_, selected_para, target_param, station_, percentages):
    print("plotUserData called....")
    print(big_data_, selected_para, target_param, station_, percentages)
    plt.figure(figsize=(20, 5))

    per_count = 0
    color = ['red', 'orange', 'blue']

    for param_ in selected_para:
        plt.plot(percentages[per_count], big_data_[
                 per_count].tolist(), color=color[per_count], label=param_)
        plt.scatter(percentages[per_count], big_data_[
                    per_count].tolist(), color=color[per_count])
        per_count += 1
        print("plotted ", param_)


    # naming the x axis
    plt.xlabel("% Change of selected parameter", fontsize='14')
    # naming the y axis
    plt.ylabel(target_param, fontsize='14')

    # giving a title to my graph
    title = "Selected Param. % Change Vs "+target_param+" ("+str(station_)+")"
    plt.title(title, fontsize='14')
    plt.legend()  # loc='lower left')
    # function to show the plot
    print("deleteing files...")
    for f in glob.glob('adminlte3/static/admin-lte/dist/js/data/' + "/*.png"):
        print("file deleted: ",os.remove(f))
        os.remove(f)
    os.remove('adminlte3/static/admin-lte/dist/js/data/Total_Phosphorus__pres.png')
    plt.savefig('adminlte3/static/admin-lte/dist/js/data/' +
                (target_param.replace(" ", '_')).replace('(mg/L)', '')+'_'+"pres.png")
#   plt.show()


def runAllParams(df_, selected_para_, percentage_change_, Pickled_LR_Model):
    print(percentage_change_)
    new_input_data = sensitivityScenarioAnalysis(
        df_, selected_para_, percentage_change_)

    return predict_(Pickled_LR_Model, new_input_data)


# Start Year should be > 2020
def scenario_(df_, selected_para_, percentage_change_, isPhos_, station_, model_path):
    target_param_path = ""
    if isPhos_ == True:
        target_param = "Total Phosphorus (mg/L)"
        target_param_path = "TotalPhosphorus"
    else:
        target_param = "Total Nitrogen (mg/L)"
        target_param_path = "TotalNitrogen"

    # Pre-processing master data
    df_ = preprocessing2(df_, station_, isPhos_)
    if df_.shape[0] <= 0:
        print("No record(s) found for Station ID =", station_,
              '\nPlease try again with another Station ID')
        return 0

    # Getting last record value from historical dataframe
    last_col_val = df_.iloc[-1]
    Pickled_LR_Model = load_model(model_path)
    per_count = 0
    percentages_lst = []
    predicted_results = []

    for param_ in selected_para_:
        per_range = [i for i in range(
            percentage_change_[per_count][0], percentage_change_[per_count][1]+25, 25)]
        percentages_lst.append(per_range)
        print(param_, per_range)
        predicted_results.append(runAllParams(
            df_, param_, per_range, Pickled_LR_Model))
        per_count += 1
    print(percentages_lst)
    plotUserData(predicted_results, selected_para_,
                 target_param, station_, percentages_lst)
    return predicted_results, target_param


def getPrescribeOutput(request, selected, land0, land1, population0, population1, rain0, rain1):
    # station = request.GET['station']
    print(selected, land0, land1, population0, population1, rain0, rain1)
    landmin = int(land0)
    landmax = int(land1)
    populationmin = int(population0)
    populationmax = int(population1)
    rainmin = int(rain0)
    rainmax = int(rain1)
    print(selected,  landmin, landmax)
    percentages = [[landmin, landmax], [
        populationmin, populationmax], [rainmin, rainmax]]
    df = pd.read_csv(
        "https://raw.githubusercontent.com/DishaCoder/CSV/main/Predict-Prescribe-Data.csv")

    isPhos = True
    if selected == 'TP':
        isPhos = True
        selected_para = [
            'Natural Land 250m (ha)', 'Population', 'Total Rain (mm) -7day Total']
        model_path = "/home/disha/Downloads/TotalPhosphorous-RF-11.sav" #ml_models/
        # model_path = "ml_models/TotalPhosphorous-RF-11.sav"

    else:
        isPhos = False
        selected_para = [
            'Natural Land 10m (ha)', 'Anthropogenic Natural Land 10m (ha)', 'Population']
        model_path = "/home/disha/Downloads/TotalNitrogen-RF-10F.sav" #ml_models/
        # model_path = "ml_models/TotalNitrogen-RF-10F.sav"

    print(model_path)
    print("in prescribe , shape of df passing is === ", df.shape)

    try:
        predicted_result, target_param = scenario_(
            df, selected_para, percentages, isPhos, "", model_path)
        print(predicted_result, target_param)
        return JsonResponse({'status': 'got it', 'target_param': target_param})
    except:
        return JsonResponse({'error': "Some error occured, Try again."})


def trial(request):
    print(request.GET['name'])
    return HttpResponse(True)
