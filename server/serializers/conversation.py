from app import ma
from models.conversation import Conversation
from models.message import Message

from marshmallow import fields

class ConversationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Conversation
        load_instance = True

    user = fields.Nested("UserSchema", many=True)
    message = fields.Nested("MessageSchema", many=True)



