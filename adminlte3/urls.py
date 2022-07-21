from django.urls import path

from .views import index, result, about, upload_file, dashboard_m, yearlyBarChart, censusPieChart, \
    censusBarChart, upload, download_p, download_n, table_preview, predictN, showMap, \
    predictedYearlyBarChart, advanced, map_experiment, download_np, upload_file_new, arcgisMapParametersDurhamRegion, predictedYearlyNitrogen, arcgisMapSoilDetailsAPI, \
    logincontroller, addNewUser, login_after, loginUsingUserCredentials, filterpagefromindex, upload_phosphorus_nitrogen, save_file, \
    datasourcespage, contact_us_page, validateUploadedFile, analysisFilterData, new_index_page, plotMap, prediction, getYearForAnalysisMap, download_predictedfile, filterDataForAnalysisPage, dextarity, in_dex, contact_us
from django.views.generic import TemplateView
from django.conf.urls import include, url
urlpatterns = [
    # path('', home, name='home'),
    # path('result', result, name='result'),
    path('', new_index_page, name="index"),
    path('additionaldetails', index, name="index"),
    path('filteryear/<str:year>', filterpagefromindex, name="index"),
    path('upload_file', upload_file, name='upload_file'),
    path('upload_file_new', upload_file_new, name='upload_file_new'),
    path('models', result, name='models'),
    path('upload', upload, name='upload'),
    path('predictN', predictN, name="predictN"),
    path('models', showMap),
    path('advanced', advanced, name='advanced'),
    path('getYearForAnalysisMap',getYearForAnalysisMap),
    path('filterDataForAnalysisPage', filterDataForAnalysisPage),
    path('map_ex/<str:year>', map_experiment, name="map_ex"),
    path('about', about, name="about"),
    
    path('table-preview', table_preview, name="table-preview"),
    path('download_p', download_p, name='download_phosphorus'),
    path('download_n', download_n, name='download_nitrogen'),
    path('download_np', download_np, name='download_np'),

    # path('', dashboard_m, name='pie-chart'),

    path('Predicted-variable/', predictedYearlyBarChart, name='Predicted-variable'),
    path('Predicted-nitrogen/', predictedYearlyNitrogen, name='Predicted-nitrogen'),

    path('Yearly-chart/', yearlyBarChart, name='Yearly-chart'),
    path('Census-pie-chart/', censusPieChart, name='Census-pie-chart'),
    path('Census-chart/', censusBarChart, name='Census-chart'),
    path('result/', result, name='result'),
    path('arcgisMapParametersDurhamRegion/<str:stationid>/<str:dateselected>', arcgisMapParametersDurhamRegion),
    path("arcgisMapSoilDetailsAPI/<str:stationid>/<str:dateselected>", arcgisMapSoilDetailsAPI),
    path("logincontroller/", logincontroller),
    path("addNewUser/", addNewUser),
    path("dashboard/", login_after),
    path("loginUsingUserCredentials/", loginUsingUserCredentials),
    path("uploaddata/", upload_phosphorus_nitrogen),
    path("save_file",save_file),
    path("plotMap", plotMap),
    path("prediction/<str:radioitem>", prediction),
    path("validateUploadedFile", validateUploadedFile),
    path('analysisFilterData', analysisFilterData),
    path("data_source/",datasourcespage),
    path("contact_us/",contact_us_page),
    path("download_predictedfile/", download_predictedfile),
    # path('upload_file/', upload_file, name="upload_file"),
# path('/upload_file/', TemplateView.as_view(template_name='adminlte/models.html')),

    # new design
    path("dexterity", dextarity),
    path("in_dex", in_dex),
    path('contact_us', contact_us),
]