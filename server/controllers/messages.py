from flask import Blueprint, request

from models.user import User
from models.message import Message
from models.conversation import Conversation

from serializers.user import UserSchema
from serializers.message import MessageSchema
from serializers.conversation import ConversationSchema

user_schema = UserSchema()
message_schema = MessageSchema()
conversation_schema = ConversationSchema()

router = Blueprint(__name__, 'messages')

@router.route('/messages', methods=['GET'])
def get_test():
    return 'route working', 200


@router.route('/messages/<user_id>/convo/<conversation_id>', methods=['POST'])
def send_message(user_id, conversation_id):

    #! Add the message to the messages table
    incom_message = request.json
    #? get the user who posted the message
    user = User.query.get(user_id)

    userone_convo = conversation_schema.query()
    message = message_schema.load(incom_message)

    message.user = user
    userone_convo.user_id = user_id

    userone_convo.save()
    message.save()
    return message_schema.jsonify(message), 200
