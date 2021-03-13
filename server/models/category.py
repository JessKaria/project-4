from app import db
from models.base import BaseModel


class Category(db.Model, BaseModel):
    __tablename__ = 'categories'
    category = db.Column(db.Text, nullable=False)

