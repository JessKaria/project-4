from app import ma
from models.user import User
from marshmallow import fields
from models.conversation import Conversation

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        exlcude = ('password_hash',)
        load_only = ('email', 'password')


    password = fields.String(required=True)
    event = fields.Nested('SimpleEventSchema', many=True)
    conversation = fields.Nested('SimpleConversationSchema', many=True)