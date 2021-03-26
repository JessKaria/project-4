
from app import db, bcrypt
from models.base import BaseModel
from models.message import Message
from models.conversation import Conversation
from models.comments import Comment
from models.events import Event
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
import jwt
from datetime import *
from config.environment import secret



class User(db.Model, BaseModel):
    __tablename__ = 'users'
    fullname = db.Column(db.String(20), nullable=False, unique=True)
    username = db.Column(db.Text, nullable=False, unique=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    headline = db.Column(db.String(400))
    photo = db.Column(db.Text)


    #?relationship to conversation & message

    events = db.relationship('Event', backref='user', cascade="all, delete")
    comments = db.relationship('Comment', backref='user', cascade="all, delete")
    messages = db.relationship('Message', backref='user', cascade='all, delete')
    #? two sides of the conversation have their ID's stored in the conversation table

    userone = db.relationship('Conversation', backref='userone', foreign_keys = 'Conversation.userone_id') 
    usertwo = db.relationship('Conversation', backref='usertwo', foreign_keys = 'Conversation.usertwo_id') 

    #? Password validation
    password_hash = db.Column(db.String(128), nullable=True)

    @hybrid_property
    def password(self):
        pass

    @password.setter
    def password(self, password_plaintext):
        encoded_pw = bcrypt.generate_password_hash(password_plaintext)
        self.password_hash = encoded_pw.decode('utf-8')



    def validate_password(self, password_plaintext):
        return bcrypt.check_password_hash(self.password_hash, password_plaintext)

    def generate_token(self):
        payload = {
            "sub": self.id,
            "iat": datetime.utcnow(),
            "exp": datetime.utcnow() + timedelta(days=1)
        }
        token = jwt.encode(payload, secret, 'HS256')

        return token

    
