from app import db
from models.base import BaseModel


class Comment(db.Model, BaseModel):
    __tablename__ = 'comments'
    comment = db.Column(db.Text, nullable=False)


