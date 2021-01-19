from flask import Flask
from flask_pymongo import pymongo
import os
from dotenv import load_dotenv
import time

app = Flask(__name__)

load_dotenv()
MONGO_CONNECTION = os.getenv("MONGO_CONNECTION")

client = pymongo.MongoClient(MONGO_CONNECTION)
db = client.get_database('grocery')
user_collection = pymongo.collection.Collection(db, 'users')

@app.route('/time')
def get_current_time():
    print(db.list_collection_names())
    return {'time' : time.time()}

@app.route('/hello')
def send_api():
    return {'hello' : 'world'}
