from flask import Flask, request
from flask_pymongo import pymongo
import os
from dotenv import load_dotenv
from datetime import datetime 
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager 
from flask_jwt_extended import create_access_token
import time

import serial
#ser = serial.Serial("/dev/ttyACM0")

app = Flask(__name__)

load_dotenv()
bcrypt = Bcrypt(app)
app.secret_key = os.getenv("SESSION_KEY")
jwt = JWTManager(app)

client = pymongo.MongoClient(os.getenv("MONGO_CONNECTION"))
db = client.get_database('grocery')
users_Collection = pymongo.collection.Collection(db, 'users')


# @app.route('/time')
# def get_current_time():
#     print(db.list_collection_names())
#     return {'time' : time.time()}

@app.route('/runArduino', methods=['POST'])
def arduino():
    connect = request.get_json()['connect']
    result = 'check failed'
    if(connect):
        ser.write(b'a')
        current = time.time()
        while(current + 5):
            ardOut = ser.read_until(expected=b'012')
            if(ardOut == b'012'):
                result = 'physical auth succeded'
                return {"result" : result}
    return {"result" : result}


@app.route('/signup', methods=['POST'])
def signup():
    firstName = request.get_json()['firstName']
    lastName = request.get_json()['lastName']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    created = datetime.utcnow()
    userID = users_Collection.insert({
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'password': password,
        'created' : created,
        'cart' : {'initial' : 'empty'}
    })
    confirmUser = users_Collection.find_one({'_id' : userID})
    result = {'email' : confirmUser['email'] + ' registered'}
    return {"result" : result}

@app.route('/login', methods=['POST'])
def login():
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""
    response = users_Collection.find_one({'email': email})
    if response:
        if bcrypt.check_password_hash(response['password'], password):
            access_token = create_access_token(identity = {
                'firstName': response['firstName'],
                'lastName': response['lastName'],
                'email': response['email']
            })
            result = {'token':access_token, "allowLogin" : True}
        else:
            result = {"error":"Invalid username and password", "allowLogin" : False}
    else:
        result = {"result":"No results found", "allowLogin" : False}
    return {"result" : result} 