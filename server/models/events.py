from app import db
from models.base import BaseModel
from models.comments import Comment

class Event(db.Model,BaseModel):
    __tablename__ = 'events'

    name = db.Column(db.String(60), nullable=False, unique=True )
    date = db.Column(db.Text, nullable=True)
    start_time = db.Column(db.Text, nullable=True)
    duration = db.Column(db.Text, nullable=True)
    description = db.Column(db.Text, nullable=True)
    target_age = db.Column(db.Text, nullable=True)
    expected_attendees = db.Column(db.Text, nullable=True)
    image = db.Column(db.Text, nullable=True)





    
    


  