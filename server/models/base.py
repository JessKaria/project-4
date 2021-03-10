
from app import db
from datetime import *

class BaseModel:
    id = db.Column(db.Integer, primary_key=True)
    create_at=db.Column(db.DateTime, default=datetime.utcnow)