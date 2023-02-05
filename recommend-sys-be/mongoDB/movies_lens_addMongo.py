import pandas as pd
import os
from pymongo import MongoClient

dataPath = os.path.abspath(os.getcwd()).replace("\\mongoDB", "") + "\\data"

connection_string = "mongodb://localhost:27017/"
client = MongoClient(connection_string)
db = client['movies_lens']

dfMovies = pd.read_csv(dataPath + "\\movies.csv")
dfRatings = pd.read_csv(dataPath + "\\ratings.csv")

db.drop_collection("movies")
db.drop_collection("ratings")

db.get_collection("movies").insert_many(dfMovies.to_dict('records'))
db.get_collection("ratings").insert_many(dfRatings.to_dict('records'))

