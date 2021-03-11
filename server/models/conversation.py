
from app import db
from models.base import BaseModel
# from models.message import Message




class Conversation(db.Model, BaseModel):
    __tablename__ = 'conversations'

    personone = db.Column(db.Integer)
    persontwo = db.Column(db.Integer)

    messages = db.relationship('Message', backref='conversation', cascade='all, delete')
    # user_one_id = db.Column(db.Integer, db.ForeignKey('user_message_id', ondelete="CASCADE"))
    user_message_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))



