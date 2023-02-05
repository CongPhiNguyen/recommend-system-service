from django.urls import path

from . import views

urlpatterns = [
  path('ratings', views.ratings, name='index'),
  path('', views.index, name='index'),
]