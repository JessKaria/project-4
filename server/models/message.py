from app import db
from models.base import BaseModel
from models.conversation import Conversation



class Message(db.Model, BaseModel):
    __tablename__ = 'messages'

    subject = db.Column(db.Text, nullable=False)
    message = db.Column(db.Text, nullable=True)

    #?FK conversationid 
    #? and user ID to go on the message

    #!2
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    
    
    #! 1
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id', ondelete="CASCADE"))

    
