from pymongo import MongoClient
from dotenv import load_dotenv
from bson.objectid import ObjectId
import os
import json

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))

db = client.training

training = db.training
# training.insert_one({'name': 'Makiese', 'age': 28, "interests":["c++", "python", "javascript"]})
docs = {}
for element in training.find():
    docs[element['name']] = element['age']

print(json.dumps(docs))
