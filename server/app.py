

from flask import Flask
from config.environment import db_URI
from flask_sqlalchemy import SQLAlchemy

#?install bcrypt
from flask_bcrypt import Bcrypt

from flask_marshmallow import Marshmallow

app = Flask(__name__) 


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

from controllers import users, messages

app.register_blueprint(users.router, url_prefix="/api")
app.register_blueprint(messages.router, url_prefix="/api")