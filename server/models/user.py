
from app import db, bcrypt
from models.base import BaseModel
from models.message import Message
from models.conversation import Conversation



class User(db.Model, BaseModel):
    __tablename__ = 'users'
    fullname = db.Column(db.Text)
    username = db.Column(db.Text, nullable=False, unique=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    photo = db.Column(db.Text)

    #?relationship to conversation & message
    
    #! 2
    messages = db.relationship('Message', backref='user', cascade='all, delete')


    #! keeps breaking when I try to create the relationship between the models,
    #! more specifically between conversation and two IDs

    userone = db.relationship('Conversation', backref='userone', foreign_keys = 'Conversation.userone_id') 
    usertwo = db.relationship('Conversation', backref='usertwo', foreign_keys = 'Conversation.usertwo_id') 
    




    
