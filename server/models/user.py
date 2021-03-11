
from app import db, bcrypt
from models.base import BaseModel
from models.message import Message


class User(db.Model, BaseModel):
    __tablename__ = 'users'
    fullname = db.Column(db.Text)
    username = db.Column(db.Text, nullable=False, unique=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    photo = db.Column(db.Text)

    messages = db.relationship('Message', backref='user', cascade='all, delete')


    
