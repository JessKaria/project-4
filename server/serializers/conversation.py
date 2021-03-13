from app import ma
from models.conversation import Conversation

from marshmallow import fields

class ConversationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Conversation
        load_instance = True

    user = fields.Nested("UserSchema", many=True)



