from app import ma
from models.conversation import Conversation
from models.message import Message
from models.user import User

from marshmallow import fields

class ConversationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Conversation
        load_instance = True

    user = fields.Nested("UserSchema", only=("id", "title", "username", "photo"))
    message = fields.Nested("MessageSchema", many=True)

class SimpleConversationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Conversation
        load_instance = True
    user = fields.Nested("UserSchema" , only=("id", "title", "username", "photo"))
    message = fields.Nested("MessageSchema", many=True)



