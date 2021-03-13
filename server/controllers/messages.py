from flask import Blueprint, request, g

from models.user import User
from models.message import Message
from models.conversation import Conversation
from decorators.secure_route import secure_route

from serializers.user import UserSchema
from serializers.message import MessageSchema
from serializers.conversation import ConversationSchema
from marshmallow.exceptions import ValidationError

user_schema = UserSchema()
message_schema = MessageSchema()
conversation_schema = ConversationSchema()

router = Blueprint(__name__, 'messages')

#!! Check if the users are in the conversation table.
#! and if yes will recurn the convo

#! Needs to work for both sides - YOU ARE SO CLOSE - CMON SON!

@router.route('/check-convo/<user2_id>', methods=['GET'])
@secure_route
def check_conversation_exists(user2_id):

    if not g.current_user:
        return { 'Access denied!' }
    current_user = g.current_user.id
    conversation = Conversation.query.filter_by(userone_id=current_user, usertwo_id=user2_id)
    if not conversation:
        return 'You need to create a conversation!'
    return conversation_schema.jsonify(conversation, many=True)


#! Conditionally render this on the front-end

@router.route('/create-convo/<user_two_id>', methods=['POST'])
@secure_route
def create_conversation(user_two_id):
        convo = request.json
        load_convo = conversation_schema.load(convo)
        load_convo.userone_id = g.current_user.id
        load_convo.usertwo_id = user_two_id
        print(load_convo)
        load_convo.save()
        return conversation_schema.jsonify(load_convo), 200


#? get your inbox aka all your conversations

@router.route('/inbox', methods=['GET'])
@secure_route
def inbox():
    conversations = Conversation.query.filter_by(userone_id=g.current_user.id).all()
    if not conversations:
        return 'You need to create a new conversation '
    return conversation_schema.jsonify(conversations, many=True), 200


#? Send messag
@router.route('/send-message/<convo_id>', methods=['POST'])
@secure_route
def send_message(convo_id):
    current_user_id = g.current_user.id
    print(current_user_id)
    incom_message = request.json
    print(incom_message)
    message = message_schema.load(incom_message)
    print(message)
    message.user_id = current_user_id
    message.conversation_id = convo_id
    message.save()
    print(message)
    return 'success', 200
