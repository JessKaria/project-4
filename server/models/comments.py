from app import db
from models.base import BaseModel



class Comment(db.Model, BaseModel):
    __tablename__ = 'comments'
    comment = db.Column(db.Text, nullable=False)

    
    event_id = db.Column(db.Integer, db.ForeignKey('events.id', ondelete="CASCADE"))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))

