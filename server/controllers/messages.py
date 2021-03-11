from flask import Blueprint, request

from models.user import User
from models.message import Message

from serializers.user import UserSchema
from serializers.message import MessageSchema

user_schema = UserSchema()
message_schema = MessageSchema()

router = Blueprint(__name__, 'messages')

@router.route('/messages', methods=['GET'])
def get_test():
    return 'route working', 200


@router.route('/messages/<user_id>/convo/<conversation_id>', methods=['POST'])
def send_message(user_id, conversation_id):

    #?get the request
    incom_message = request.json
    #? get the user who posted the message
    user = User.query.get(user_id)
    print(user)

    #? deserialize
    message = message_schema.load(incom_message)
    print(message)

    message.user = user
    print(user)
    message.conversation_id = conversation_id
    print(conversation_id)
    print(message)
    message.save()

    return message_schema.jsonify(message), 200
