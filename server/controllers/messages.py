from flask import Blueprint, request

from models.user import User
from models.message import Message
from models.conversation import Conversation

from serializers.user import UserSchema
from serializers.message import MessageSchema
from serializers.conversation import ConversationSchema
from marshmallow.exceptions import ValidationError

user_schema = UserSchema()
message_schema = MessageSchema()
conversation_schema = ConversationSchema()

router = Blueprint(__name__, 'messages')


#!! Check if the users are in the conversation table.
##! If they are it will return the conversation
#! If they arent it will return a prompt to create a converstaion
#! We need to render this on the front end
#! this only works on once side how can you test for the column
@router.route('/check-history/<user_one_id>/convo/<user_two_id>', methods=['GET'])
def messages_test(user_one_id, user_two_id):
    #? check if the conversation exists
    conversation = Conversation.query.filter_by(userone_id=user_one_id, usertwo_id=user_two_id).first()
    # conversationtw = Conversation.query.filter_by(userone_id=user_two_id, usertwo_id=user_one_id).first()
    #? if it doesnt create the conversation
        #? get the users by id and POST them to conversations table can I DO THIS IN A GET?
    if not conversation:
        return 'You need to create a new conversation '
    return conversation_schema.jsonify(conversation), 200


#! get all the message that have been to sent to you?
@router.route('/check-convos/<user_one_id>', methods=['GET'])
def get_convos(user_one_id):
    #? check if the conversation exists
    conversation = Conversation.query.filter_by(userone_id=user_one_id).all()
    if not conversation:
        return 'You need to create a new conversation '
    return conversation_schema.jsonify(conversation, many=True), 200


#! get your sent box - work out inbox!
@router.route('/check-messages/<user_id>', methods=['GET'])
def get_messages(user_id):
    #? check if the conversation exists
    messages = Message.query.filter_by(user_id=user_id).all()
    if not messages:
        return 'UhOh! Something has gone wrong! '
    return message_schema.jsonify(messages, many=True), 200



#! This is basically conditional and should only initiate if they have
#! No conversation history
@router.route('/message/<user_one_id>/convo/<user_two_id>', methods=['POST'])
def create_conversation(user_one_id, user_two_id):
    conversation = Conversation.query.filter_by(userone_id=user_one_id, usertwo_id=user_two_id).first()
    if not conversation:
        convo = request.json
        load_convo = conversation_schema.load(convo)
        load_convo.userone_id = user_one_id
        load_convo.usertwo_id = user_two_id
        print(load_convo)
        load_convo.save()
        return conversation_schema.jsonify(load_convo), 200
    else:
        return 'conversation already exists!', 200


#! This should send a message and populate the table
@router.route('/send-message/<user_id>/convo/<conversation_id>', methods=['POST'])
def send_message(user_id, conversation_id):
    incom_message = request.json
    message = message_schema.load(incom_message)
    message.user_id = user_id
    message.conversation_id = conversation_id
    message.save()
    return message_schema.jsonify(message), 200
