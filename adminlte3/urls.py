from django.urls import path
from .views import index, result, about, upload_file, dashboard_m, yearlyBarChart, censusPieChart, \
    censusBarChart, upload, download_p, download_n, table_preview, predictN, showMap, \
    predictedYearlyBarChart, advanced, map_experiment, download_np, upload_file_new, arcgisMapParametersDurhamRegion, predictedYearlyNitrogen, arcgisMapSoilDetailsAPI, logincontroller, addNewUser
from django.views.generic import TemplateView
from django.conf.urls import include, url

urlpatterns = [
    # path('', home, name='home'),
    # path('result', result, name='result'),
    path('', index, name="index"),
    path('upload_file', upload_file, name='upload_file'),
    path('upload_file_new', upload_file_new, name='upload_file_new'),
    path('models', result, name='models'),
    path('upload', upload, name='upload'),
    path('predictN', predictN, name="predictN"),
    path('models', showMap),
    path('advanced', advanced, name='advanced'),
    path('map_ex', map_experiment, name="map_ex"),
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
    path('arcgisMapParametersDurhamRegion/', arcgisMapParametersDurhamRegion),
    path("arcgisMapSoilDetailsAPI/", arcgisMapSoilDetailsAPI),
    path("logincontroller/", logincontroller),
    path("addNewUser/", addNewUser)
    # path('upload_file/', upload_file, name="upload_file"),
# path('/upload_file/', TemplateView.as_view(template_name='adminlte/models.html')),


]