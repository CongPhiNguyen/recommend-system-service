from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .movies_len import MovieLens
from surprise import SVD
import pathlib

ml = MovieLens()
data = ml.loadMovieLensLatestSmall()

def BuildAntiTestSetForUser(testSubject, trainset):
    fill = trainset.global_mean

    anti_testset = []
    
    u = trainset.to_inner_uid(str(testSubject))
    
    user_items = set([j for (j, _) in trainset.ur[u]])
    anti_testset += [(trainset.to_raw_uid(u), trainset.to_raw_iid(i), fill) for
                             i in trainset.all_items() if
                             i not in user_items]
    return anti_testset

def index(request):
  userId = request.GET.get('userId', "")
  testSubject = int(userId)
  
  userRatings = ml.getUserRatings(testSubject)
  loved = []
  hated = []
  for ratings in userRatings:
    if (float(ratings[1]) > 4.0):
        loved.append(ratings)
    if (float(ratings[1]) < 3.0):
        hated.append(ratings)
  # Building models
  trainSet = data.build_full_trainset()

  algo = SVD()
  algo.fit(trainSet)

  # Computing recommendations
  testSet = BuildAntiTestSetForUser(testSubject, trainSet)
  predictions = algo.test(testSet)

  recommendations = []
  for userID, movieID, actualRating, estimatedRating, _ in predictions:
      intMovieID = int(movieID)
      recommendations.append((intMovieID, estimatedRating))

  recommendations.sort(key=lambda x: x[1], reverse=True)
  # print(recommendations)

  movies_list = []
  for ratings in recommendations[:10]:
    movies_list.append({"filmTitle": ml.getMovieName(ratings[0])})
  
  return JsonResponse({'ratings':"userRatings", "userId": movies_list})