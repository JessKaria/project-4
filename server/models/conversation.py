
from app import db
from models.base import BaseModel




class Conversation(db.Model, BaseModel):
    __tablename__ = 'conversations'

    personone = db.Column(db.Integer)
    persontwo = db.Column(db.Integer)

    messages = db.relationship('Message', backref='conversation', cascade='all, delete')