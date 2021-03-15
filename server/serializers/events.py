from app import ma
from models.events import Event

from marshmallow import fields


class EventSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Event
        load_instance = True

    user = fields.Nested('UserSchema')
    comments = fields.Nested("CommentSchema", many=True)
    category = fields.Nested("CategorySchema", many=True)


class SimpleEventSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Event
        load_instance = True
    comments = fields.Nested("CommentSchema", many=True)
    category = fields.Nested("CategorySchema", many=True)
    user = fields.Nested('UserSchema')


        