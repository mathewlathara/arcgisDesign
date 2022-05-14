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
from django.shortcuts import render
from django.utils.datastructures import MultiValueDictKeyError
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from pandas.core.frame import DataFrame
from django.http import JsonResponse
import re
import folium
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import UserRegistration
# import geopandas as gpd
# import shapefile



# Create your views here.
def index(request):

    yearslected = request.GET.get('yearid', "2020")
    # create map
    
    if yearslected == "":
        yearslected = "2017"
    col_list = ["STATION", "Latitude", "Longitude", "DATE", "TotalPhosphorus", "TotalNitrogen"]
    masterdatafile = pd.read_csv("MasterData-2022-03-27.csv", usecols=col_list, sep = ",")
    masterdatafile.DATE = pd.to_datetime(masterdatafile.DATE, format='%b %d- %Y', infer_datetime_format=True)
    masterdatafile = masterdatafile[(masterdatafile['DATE'] > yearslected + "-01-01") & (masterdatafile['DATE'] < yearslected + "-12-31")].fillna(0)
    if(masterdatafile.count().STATION > 0):
        avgphosphorus = round(masterdatafile["TotalPhosphorus"].mean(),2)
        avgnitrogen = round(masterdatafile["TotalNitrogen"].mean(),2)
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
            filterhotspots = uniquecolumnfile[(uniquecolumnfile["STATION"] == row[0])]
            if(filterhotspots.count().STATION > 0):
                phosphorusnumber = round(filterhotspots["TotalPhosphorus"].mean(),2)
                nitrogernnumber = round(filterhotspots["TotalNitrogen"].mean(),2)
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
        loopvalue = {"station":row[0], "latitude":row[1],"longitude":row[2], "stationiconlink":stationiconlink}
        json_return.append(loopvalue)
    print(f"Year selected: {yearslected}")
    json_return = json.dumps(json_return)
    regiondemographicrenderurl = "https://services.arcgis.com/t0XyVE44waBIPBFr/arcgis/rest/services/trca_landuse_naturalcover_2017shp/FeatureServer/0"
    return render(request, "adminlte/index1.html", {"jsonvalue":json_return, "regiondemographicrenderurl" : regiondemographicrenderurl, "yearselected" : yearslected})
# This file is supposed to be edited in terms of making changes on main dashboard

def logincontroller(request):
    return render(request, "adminlte/login1.html")

def login_after(request):
    username = ""
    # if 'username' in request.session:
        # username = request.session['username']
        # print(username)
    return render(request, "adminlte/landing.html")

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

        model_info = {'ac1': round(random_forest[0], 2), 'ac2': round(random_forest[1], 2), 'ac3': round(random_forest[2], 2), 'ac4': random_forest[3]}
        send_info = {}
        if selectedModel == "Random Forest":
            print("rf if")
            print(request.GET.get("model"))
            send_info = {'ac1': round(random_forest[0], 2), 'ac2': round(random_forest[1], 2), 'ac3': round(random_forest[2], 2), 'ac4': random_forest[3]}
            return render(request, 'adminlte/models.html', send_info)

        elif selectedModel == "Cross Validation":
            print("inside cv")
            print(request.GET.get("model"))
            send_info = {'ac1':cross_validation[0], 'ac2':cross_validation[1], 'ac3':cross_validation[2], 'ac4': cross_validation[2]}
            return render(request, 'adminlte/models.html', send_info)

        elif selectedModel == "XGBoost I":
            print("inside xg 1")
            send_info = {'ac1':xgboost_1[0], 'ac2':xgboost_1[1], 'ac3':xgboost_1[2], 'ac4': xgboost_1[2]}
            return render(request, 'adminlte/models.html', send_info)

        # return JsonResponse(json.dumps(model_info))
        else :
            return render(request, 'adminlte/models.html', model_info)
    else:
        print("Its post method")
        print("model",request.POST.get("model"))
        # random_forest = [0.01, 0.01, 96, 82]
        #
        # send_info = {'ac1': round(random_forest[0], 2), 'ac2': round(random_forest[1], 2), 'ac3': round(random_forest[2], 2), 'ac4': random_forest[3]}

        parameters, phosphorus = predictP(request)
        ac = getModel()
        return render(request, 'adminlte/models.html', {'ans':parameters, 'p': str(round(phosphorus[0], 2))})#, {'ac1': round(ac[0], 2), 'ac2': round(ac[1], 2),
                                                       # 'ac3': round(ac[2], 2), 'ac4': ac[3],
                                                      #  'p': str(round(phosphorus[0], 2))})


def predictP(request):
    if request.POST.get('feature6'):
        if (request.POST.get('feature1') == None):
            ph, month, year, cyear, rain0, rainm3, rainm1, nitrogen, nk = 0,0,0,0,0,0,0,0,0
        else :
            print("model",request.POST.get('model'))
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
            o2, depth, n, nk, tss = 0,0,0,0,0
        else :
            print("model",request.POST.get('model'))
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
            # os.remove(os.path.join(settings.MEDIA_ROOT, name))
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

            df_p = uploaded_csv[['Oxygen, Dissolved (% Saturation)', 'Depth, Sample (Field)', 'Nitrite', 'Nitrogen, Total Kjeldahl (TKN)', 'Solids, Suspended (TSS)']].copy()
            df_p = df_p.dropna()
            df_p.to_csv("df_p.csv", index=False)
            model = pickle.load(open('ml_models/TotalPhosphorous_XG_87.sav', 'rb'))
            phosphorus = np.round(model.predict(df_p),2)
            phosphorus = pd.DataFrame(phosphorus)
            phosphorus.columns = ['Phosphorus']
            phosphorus_pred_csv = pd.concat([df_p, phosphorus.reindex(df_p.index)], axis=1)
            phosphorus_pred_csv.to_csv("adminlte3/static/admin-lte/dist/js/data/predicted_phosphorus_only.csv", index=False)
            print("Phosphorus predicted")

            # Predict Nitrogen
            df_n = uploaded_csv[['Chloride, Total','Nitrogen; nitrite','Nitrate']].copy()
            df_n = pd.concat([df_n, phosphorus.reindex(df_n.index)], axis=1)
            df_n = df_n.dropna()
            model_n = pickle.load(open('ml_models/TotalNitrogen-RF.sav', 'rb'))
            nitrogen = np.round(model_n.predict(df_n),2)
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

            context = {'shape':csv_shape, 'null_values':null_values, 'high_p':high_p.shape[0] , 'high_n':high_n.shape[0]}

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
        print("What is checked : ",checked)

    if request.method == 'POST':

        uploaded_file = request.FILES['document']
        fs = FileSystemStorage()
        fs.delete('data/user_uploaded_data/user_uploaded_csv_file.csv')
        name = fs.save('data/user_uploaded_data/user_uploaded_csv_file.csv', uploaded_file)
        print("Filename: ",name)
        print("File uploaded")
        context['url'] = fs.url(name)

        # File operation
        test_df = pd.read_csv(name)
        print(test_df.shape[1])

        # implementing validation
        if (test_df.shape[1] > 20):# or (test_df.shape[1] != 5):
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
                model = pickle.load(open('ml_models/TotalPhosphorous-RF-All-16F.sav', 'rb'))
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

            elif selectedModel == "XGBoost 5F": #XGBoost 5F
                model_xg_1 = pickle.load(open('ml_models/TotalPhosphorous-XG-5F.sav', 'rb'))
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

            elif selectedModel == "XGBoost 19F":
                model_cv = pickle.load(open('ml_models/TotalPhosphorous-XG-19F.sav', 'rb'))
                df_pred = model_cv.predict(test_df)
                df_pred = pd.DataFrame(df_pred)
                df_pred.to_csv("pred.csv", index=False)
                print("File saved cross validation, prediction generated")
                # Merging with test dataset
                df_pred.columns = ['Phosphorus']
                new_pred = pd.concat([test_df, df_pred.reindex(test_df.index)], axis=1)
                new_pred.head()
                new_pred.to_csv("data/Latest_predictions/predicted_phosphorus.csv", index=False)
                new_pred.to_csv("data/Latest_predictions/recently_predicted.csv", index=False)
                new_pred.to_csv("static/admin-lte/dist/js/predicted_phosphorous.csv", index=False)
                new_pred.to_csv("adminlte3/static/admin-lte/dist/js/data/recently_predicted.csv", index=False)
                context = {'file_ready': "File is ready to download."}

            else:
                model_error_msg = "Something went wrong with selected model";
                return render(request, 'adminlte/models.html', {'error': model_error_msg})

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
        print("Filename: ",name)
        print("File uploaded")
        context['url'] = fs.url(name)

        # File operation
        test_df = pd.read_csv(name)
        print(test_df.shape[1])

        # implementing validation
        if (test_df.shape[1] > 20):# or (test_df.shape[1] != 5):
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
                model_error_msg = "Something went wrong with selected model";
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

def plotMap(featuresSelected):
    df = pd.read_csv("data/data/Merged-SurfaceWQ.csv")
    df.to_json("adminlte3/static/admin-lte/dist/js/data/all_features.json")

    # geoJsondf = shapefile.Reader("data/Shape files/durham_points_watersheds.shp")


    # ------locations on map according to given logi and lati in dataset------
    m1 = folium.Map(
        # location=[78.92,43.93 ],
        location=[43.90, -78.79]
        # tiles='Stamen Terrain',
        # zoom_start=15,
    )
    featuresSelected.append("LATITUDE")
    featuresSelected.append("LONGITUDE")
    featuresSelected.append("STATION")
    df.apply(lambda row: folium.Marker(location=[row["LATITUDE"], row["LONGITUDE"]], tooltip="Click me", popup='Oxygen, Dissolved (% Saturation)'+str(row['Oxygen, Dissolved (% Saturation)'])).add_to(m1), axis=1)
    # crating popup for selected features
    df_filtered = df[featuresSelected].copy()
    # df_filtered.apply(lambda row: folium.Marker(location=[row["LATITUDE"], row["LONGITUDE"]], tooltip="Click me", popup='Oxygen, Dissolved (% Saturation) = '+str(row['Oxygen, Dissolved (% Saturation)'])).add_to(m1), axis=1)

    # if featuresSelected!=None:
    #     print("Calling fancy")
    #     for i in range(0, len(df_filtered)):
    #         html = fancy_html(i,df_filtered)
    #
    #         iframe = branca.element.IFrame(html=html, width=200, height=150)
    #         popup = folium.Popup(iframe, parse_html=True)
    #
    #         folium.Marker([df['LATITUDE'].iloc[i], df['LONGITUDE'].iloc[i]],
    #                       popup=popup, icon=folium.Icon(color="blue", icon='info-sign')).add_to(m1)
    # else:
    #     df.apply(lambda row: folium.Marker(location=[row["LATITUDE"], row["LONGITUDE"]], tooltip="Click me", popup='Oxygen, Dissolved (% Saturation)'+str(row['Oxygen, Dissolved (% Saturation)'])).add_to(m1), axis=1)

    # for i in featuresSelected:
    #     print("feature = ",i)
    #     df.apply(lambda row: folium.Marker(location=[row["LATITUDE"], row["LONGITUDE"]], tooltip="Click me",
    #                                        popup=i + str(
    #                                            row[i])).add_to(m1), axis=1)

    m1 = m1._repr_html_()
    context = {
        'm': m1,
    }
    return context

features = []
def map_experiment(request):
    yearslected = request.GET.get('yearid')
    # create map
    
    if yearslected == "":
        yearslected = "2017"
    col_list = ["STATION", "Latitude", "Longitude", "DATE", "TotalPhosphorus", "TotalNitrogen"]
    masterdatafile = pd.read_csv("MasterData-2022-03-27.csv", usecols=col_list, sep = ",")
    masterdatafile.DATE = pd.to_datetime(masterdatafile.DATE, format='%b %d- %Y', infer_datetime_format=True)
    masterdatafile = masterdatafile[(masterdatafile['DATE'] > yearslected + "-01-01") & (masterdatafile['DATE'] < yearslected + "-12-31")].fillna(0)
    if(masterdatafile.count().STATION > 0):
        avgphosphorus = round(masterdatafile["TotalPhosphorus"].mean(),2)
        avgnitrogen = round(masterdatafile["TotalNitrogen"].mean(),2)
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
            filterhotspots = uniquecolumnfile[(uniquecolumnfile["STATION"] == row[0])]
            if(filterhotspots.count().STATION > 0):
                phosphorusnumber = round(filterhotspots["TotalPhosphorus"].mean(),2)
                nitrogernnumber = round(filterhotspots["TotalNitrogen"].mean(),2)
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
        loopvalue = {"station":row[0], "latitude":row[1],"longitude":row[2], "stationiconlink":stationiconlink}
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
    return render(request, "adminlte/map_experiment.html", {"jsonvalue":json_return, "regiondemographicrenderurl" : regiondemographicrenderurl, "yearselected" : yearslected})

def advanced(request):
    # yearFrom = request.GET.get('yearFrom')
    # yearTo = request.GET.get('yearTo')
    # print(yearFrom, yearTo)

    # df = pd.read_csv("data/data/df_top_10.csv")
    # df.head()
    # map_experiment(request)
    # username = ""
    # username = request.session['username']
    return render(request, "adminlte/new_page.html")


def about(request):
    return render(request, "adminlte/about.html")

@api_view(('GET',))
def arcgisMapParametersDurhamRegion(request):
    stationid = request.GET.get('stationid')
    dateselected = request.GET.get('dateselected')
    print(f"stationid----->{stationid} & dateselected ---> {dateselected}")
    if(stationid.startswith("0")):
        stationid = stationid[1:]
        print(f"station id in if----->{stationid}")
    col_list = ["DATE", "Chloride", "Population", "TotalPhosphorus", "TotalNitrogen", "STATION"]
    # masterdatafile = pd.read_csv("MasterData-2022-03-27.csv", usecols=col_list, sep = ",", header = 0, index_col = False)
    masterdatafile = pd.read_csv("MasterData-2022-03-27.csv", usecols=col_list, sep = ",", dtype={"STATION": "string", "Chloride": float, "Population":"string", "TotalPhosphorus":float, "TotalNitrogen": float})
    masterdatafile.DATE = pd.to_datetime(masterdatafile.DATE, format='%b %d- %Y', infer_datetime_format=True)
    masterdatafile = masterdatafile[(masterdatafile['DATE'] > dateselected + "-01-01") & (masterdatafile['DATE'] < dateselected + "-12-31") & (masterdatafile['STATION'].str.contains(stationid)==True)].fillna(0)
    print(f"Exist or not--->{ masterdatafile.count().STATION} ")
    if(masterdatafile.count().STATION > 0):
        avgchloride = round(masterdatafile["Chloride"].mean(),2)
        populationdata = masterdatafile["Population"].str.replace(',','').fillna(masterdatafile["Population"])
        avgpopulation = round(populationdata.apply(lambda x: float(x)).mean(),2)
        avgphosphorus = round(masterdatafile["TotalPhosphorus"].mean(),2)
        avgnitrogen = round(masterdatafile["TotalNitrogen"].mean(),2)
        # print(totchloride)

        json_return = []
        # for index, row in uniquecolumnfile.iterrows():
        #     # print(f"Index : {index} row : {row[2]}")
        #     loopvalue = {"station":row[0], "latitude":row[1],"longitude":row[2]}
        #     json_return.append(loopvalue)
        # json_return = json.dumps(json_return)
        return Response({"status": "success", "avgchloride":avgchloride, "avgpopulation":avgpopulation, "avgphosphorus":avgphosphorus,"avgnitrogen":avgnitrogen, "stationid":stationid})
    else:
        return Response({"status": "notfound", "avgchloride":"NA", "avgpopulation":"NA", "avgphosphorus":"NA","avgnitrogen":"NA", "stationid":stationid})
    

@api_view(('GET',))
def arcgisMapSoilDetailsAPI(request):
    stationid = request.GET.get('stationid')
    dateselected = request.GET.get('dateselected')
    if(stationid.startswith("0")):
        stationid = stationid[1:]
    print(f"stationid----->{stationid}  dateselected------> {dateselected}")
    col_list = ["DATE", "DSS_ClaySiltSand_TCLAYwtd", "DSS_ClaySiltSand_TOTHERwtd", "DSS_ClaySiltSand_TSANDwtd", "DSS_ClaySiltSand_TSILTwtd", "DSS_ClaySiltSand_TUNKNOWNwtd", "STATION", "MeanTemp14dayMean", "MeanTemp1dayMean", "MeanTemp28dayMean", "MeanTemp3dayMean", "MeanTemp56dayMean", "MeanTemp7dayMean", "MeanTemp0dayMean", "TotalRain14dayTotal", "TotalRain1dayTotal", "TotalRain28dayTotal", "TotalRain3dayTotal", "TotalRain56dayTotal", "TotalRain7dayTotal", "TotalRain0dayTotal", "250mLandCover_Agricultural", "250mLandCover_Anthropogenic", "250mLandCover_Natural", "DrainageBasinArea_sqkm", "LandAreaSqkm", "Population", "Latitude", "Longitude"]
    masterdatafile = pd.read_csv("MasterData-2022-03-27.csv", usecols=col_list, sep = ",", dtype={"STATION": "string", "DATE":"string", "DSS_ClaySiltSand_TCLAYwtd":float, "DSS_ClaySiltSand_TOTHERwtd":float, "DSS_ClaySiltSand_TSILTwtd":float, "DSS_ClaySiltSand_TUNKNOWNwtd":float, "MeanTemp14dayMean" : float, "MeanTemp1dayMean" : float, "MeanTemp28dayMean" : float, "MeanTemp3dayMean" : float, "MeanTemp56dayMean" : float, "MeanTemp7dayMean" : float, "MeanTemp0dayMean" : float, "TotalRain14dayTotal" : float, "TotalRain1dayTotal" : float, "TotalRain28dayTotal" : float, "TotalRain3dayTotal" : float, "TotalRain56dayTotal" : float, "TotalRain7dayTotal" : float, "TotalRain0dayTotal" : float, "250mLandCover_Agricultural" : float, "250mLandCover_Anthropogenic" : float, "250mLandCover_Natural" : float, "DrainageBasinArea_sqkm" : float, "LandAreaSqkm" : float, "Population" : "string", "Latitude" : float, "Longitude" : float})
    masterdatafile.DATE = pd.to_datetime(masterdatafile.DATE, format='%b %d- %Y', infer_datetime_format=True)
    masterdatafile = masterdatafile[(masterdatafile['DATE'] > dateselected +"-01-01") & (masterdatafile['DATE'] < dateselected + "-12-31") & (masterdatafile['STATION'].str.contains(stationid)==True)].fillna(0)
    print(masterdatafile)
    if(masterdatafile.count().STATION > 0):
        masterdatafile = masterdatafile.reset_index()
        totalTCLAYwtd = masterdatafile["DSS_ClaySiltSand_TCLAYwtd"].unique()
        totalTOTHERwtd = masterdatafile["DSS_ClaySiltSand_TOTHERwtd"].unique()
        totalTSANDwtd = masterdatafile["DSS_ClaySiltSand_TSANDwtd"].unique()
        totalTSILTwtd = masterdatafile["DSS_ClaySiltSand_TSILTwtd"].unique()
        totalTUNKNOWNwtd = masterdatafile["DSS_ClaySiltSand_TUNKNOWNwtd"].unique()
        totalagricultural = masterdatafile["250mLandCover_Agricultural"].unique()
        totalanthropogenic = masterdatafile["250mLandCover_Anthropogenic"].unique()
        totalnatural = masterdatafile["250mLandCover_Natural"].unique()
        totaldrainagebasinsqkm = masterdatafile["DrainageBasinArea_sqkm"].unique()
        totalareasqkm = masterdatafile["LandAreaSqkm"].unique()
        totalpopulation = masterdatafile["Population"].str.replace(',','').fillna(masterdatafile["Population"])
        latitude = masterdatafile["Latitude"].unique()
        longitude = masterdatafile["Longitude"].unique()
        longitudestring = str(longitude[0])
        print(longitudestring[1:])
        linegraphreturnlist = []
        bargraphRainfall = []
        for index, row in masterdatafile.iterrows():
            color = "%06x" % random.randint(0, 0xFFFFFF)
            json_string = {"data":[row["MeanTemp56dayMean"], row["MeanTemp28dayMean"], row["MeanTemp7dayMean"], row["MeanTemp3dayMean"], row["MeanTemp1dayMean"]], "borderColor": '#' + color, "fill":"false"}
            linegraphreturnlist.append(json_string)
            rainfalljsonstring = {"x":["fiftysix","twentyeight","forteen","seven","three","one","zero"], "y":[row["TotalRain56dayTotal"], row["TotalRain28dayTotal"], row["TotalRain14dayTotal"], row["TotalRain7dayTotal"], row["TotalRain3dayTotal"], row["TotalRain1dayTotal"], row["TotalRain0dayTotal"]], "type": 'bar', "name":pd.to_datetime(row["DATE"]).date()}
            bargraphRainfall.append(rainfalljsonstring)
            # print(row["MaxTemp14dayMean"], row["MaxTemp28dayMean"])
        print(linegraphreturnlist)
        # MaxTemp14dayMean = masterdatafile["MaxTemp14dayMean"].to_list()
        # "MaxTemp1dayMean", "MaxTemp28dayMean", "MaxTemp3dayMean", "MaxTemp56dayMean", "MaxTemp7dayMean", "MaxTemp0dayMean"
        print(f"totalclaywtd------>{totalTCLAYwtd}")
        return Response({"status":"success", "totalTCLAYwtd" : totalTCLAYwtd, "totalTOTHERwtd" : totalTOTHERwtd, "totalTSANDwtd" : totalTSANDwtd, "totalTSILTwtd" : totalTSILTwtd, "totalTUNKNOWNwtd" : totalTUNKNOWNwtd, "linegraphreturnlist" : linegraphreturnlist, "bargraphRainfall" : bargraphRainfall, "totalagricultural" : totalagricultural, "totalanthropogenic" : totalanthropogenic, "totalnatural" : totalnatural, "totaldrainagebasinsqkm" : totaldrainagebasinsqkm, "totalareasqkm" : totalareasqkm, "totalpopulation" : totalpopulation[0], "latitude" : latitude, "longitude" : longitudestring[1:]})
    else:
        return Response({"status":"notfound"})

@api_view(('POST',))
def addNewUser(request):
    user=request.user
    status = "success"
    if request.method == "POST":
        emailaddress = request.POST['emailaddress']
        password = request.POST['password']
        userregistration = UserRegistration()
        checkifuserexists = UserRegistration.objects.all().filter(user_name=emailaddress.strip()).count()
        if checkifuserexists == 0:
            userregistration.user_name = emailaddress.strip()
            userregistration.user_password = password.strip()
            userregistration.save()
        else:
            status = "exists"
    return Response({"status":status})

@api_view(('POST',))
def loginUsingUserCredentials(request):
    status = "success"
    if request.method == "POST":
        emailaddress = request.POST['emailaddress']
        password = request.POST['password']
        print(f"Username: {emailaddress} password : {password}")
        checkifuserexists = UserRegistration.objects.all().filter(user_name=emailaddress.strip()).filter(user_password=password.strip()).count()
        print(f"checkifuserexists: {checkifuserexists}")
        if checkifuserexists == 0:
            status = "notfound"
        else:
            request.session['username'] = emailaddress
    return Response({"status":status})