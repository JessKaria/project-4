from app import ma
from models.message import Message
from models.user import User


from marshmallow import fields

class MessageSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Message
        load_instance = True
        
    user = fields.Nested("UserSchema")
    user = fields.Nested("UserSchema")
    

    