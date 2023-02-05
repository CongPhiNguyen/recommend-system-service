from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from pymongo import MongoClient

connection_string = "mongodb://localhost:27017/"
client = MongoClient(connection_string)
db = client['movies_lens']

def index(request):
    moviesCursor = db.get_collection("movies").find({})
    movies = []
    index = 0
    for movie in moviesCursor:
        index = index + 1
        if index==100:
            break
        movies.append(str(movie))
    
    return JsonResponse({"data":movies})

def ratings(request):
    ratingsCursor = db.get_collection("ratings").find({})
    ratings = []
    index = 0
    for rating in ratingsCursor:
        index = index + 1
        if index==100:
            break
        ratings.append(str(rating))
    
    return JsonResponse({"data":ratings})