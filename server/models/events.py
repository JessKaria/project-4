
from app import db
from models.base import BaseModel
from models.comments import Comment
from models.event_category import events_categories_join
from models.category import Category



class Event(db.Model,BaseModel):
    __tablename__ = 'events'

    name = db.Column(db.String(60), nullable=False, unique=True )
    date = db.Column(db.Text, nullable=False)
    start_time = db.Column(db.Text, nullable=False)
    duration = db.Column(db.Text, nullable=True)
    description = db.Column(db.Text, nullable=True)
    target_age = db.Column(db.Integer, nullable=True)
    expected_attendees = db.Column(db.Integer, nullable=True)
    location = db.Column(db.Text, nullable=True)
    image = db.Column(db.Text, nullable=True)
    ticketed = db.Column(db.Boolean, nullable=True)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    comments = db.relationship('Comment', backref='event', cascade="all, delete")
    category = db.relationship('Category', backref='categories', secondary=events_categories_join)







    
    


  