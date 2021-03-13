from app import ma
from models.user import User
from marshmallow import fields

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        exlcude = ('password_hash',)
        load_only = ('email', 'password')


    password = fields.String(required=True)
    event = fields.Nested('SimpleEventSchema', many=True)