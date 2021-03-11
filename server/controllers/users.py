from flask import Blueprint, request

from models.user import User
from serializers.user import UserSchema
from marshmallow.exceptions import ValidationError
user_schema = UserSchema()



router = Blueprint(__name__, 'users')


@router.route('/register', methods=['POST'])
def register():
    try:
        user = user_schema.load(request.json)
    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong.' }
    user.save()
    
    return user_schema.jsonify(user), 200