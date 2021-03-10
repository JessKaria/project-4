from app import db
from models.base import BaseModel
from models.conversation import Conversation


class Message(db.Model, BaseModel):
    __tablename__ = 'messages'

    subject = db.Column(db.Text, nullable=False, unique=True)
    message = db.Column(db.Text, nullable=True)

    
    
    user_message_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id'))
