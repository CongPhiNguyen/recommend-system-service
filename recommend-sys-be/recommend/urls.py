from django.urls import path
from pymongo import MongoClient
from . import views


urlpatterns = [
    path('', views.index, name='index'),
   
]