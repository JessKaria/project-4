

from flask import Flask
from config.environment import db_URI
from flask_sqlalchemy import SQLAlchemy

#?install bcrypt
from flask_bcrypt import Bcrypt

from flask_marshmallow import Marshmallow

app = Flask(__name__, static_folder='dist') 

from decorators import logging

#? we crap our app in bcrypt

#? this will configure the app to talk to the database using SQLA Alchemy
app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

#?
db = SQLAlchemy(app)

#? Import my controllers and register them with flask
#? the below line will import all the variable from the controllers file

ma = Marshmallow(app)

bcrypt = Bcrypt(app)

from controllers import users, messages, event, comments

app.register_blueprint(users.router, url_prefix="/api")
app.register_blueprint(messages.router, url_prefix="/api")
app.register_blueprint(event.router, url_prefix="/api")
app.register_blueprint(comments.router, url_prefix="/api")

import os

@app.route('/', defaults={'path': ''}) # homepage
@app.route('/<path:path>') # any other path
def catch_all(path):
    dirname = os.path.dirname(__file__)
    filename = os.path.join(dirname, 'dist/' + path)

    if os.path.isfile(filename): # if path is a file, send it back
        return app.send_static_file(path)

    return app.send_static_file('index.html') # otherwise send back the index.html file

