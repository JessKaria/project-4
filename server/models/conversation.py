
from app import db
from models.base import BaseModel



class Conversation(db.Model, BaseModel):
    __tablename__ = 'conversations'

    
    #? conversation relationship with message
    #! 1
    c_messages = db.relationship('Message', backref='c_user', cascade='all, delete')


    #?this needs two FK userids? 
    #!3
    userone_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
    usertwo_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))


