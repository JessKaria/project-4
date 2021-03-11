from app import ma
from models.message import Message

class MessageSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Message
        load_instance = True

        