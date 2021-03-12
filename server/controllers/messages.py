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

@router.route('/message/<user_one_id>/convo/<user_two_id>', methods=['post'])
def get_test():

    return 'route working', 200


@router.route('/message/<user_one_id>/convo/<user_two_id>', methods=['GET'])
def messages_test(user_one_id, user_two_id):

    #? check if the conversation exists
    conversation = Conversation.query.filter_by(userone_id=user_one_id, usertwo_id=user_two_id).first()
    # conversationtw = Conversation.query.filter_by(userone_id=user_two_id, usertwo_id=user_one_id).first()
    #? if it doesnt create the conversation
        #? get the users by id and add them to conversations table
    if not conversation:
        return 'You need to create a new conversation '
    return conversation_schema.jsonify(conversation), 200







@router.route('/messages/<user_id>/convo/<conversation_id>', methods=['POST'])
def send_message(user_id, conversation_id):




    #! SAVE REQUEST TO MESSAGES TABLE

    #! SAVE USER ID AND CONVERSATION ID TO MESSAGES TABLE - THIS MAY BE REDUNDANT

    #! SAVE USERID TO USERONE ON CONVERSATION TABLE

    #! Ideas to solve:
    #? should send as part of the request? (haven't tried)
    #? can we create a function that creates a conversation we call it below (haven't tried)
    #? can I create an empty row in coversation table (haven't tried)
    #? update CASCADE? (haven't tried, not sure if it works)

    #! the below will populate messages but not convo table
    #! validation error when I un comment
     #? save request as a dict
    incom_message = request.json
    #? get the user who posted the message
    #? serialize the message

    # load_user = conversation_schema.load(user_id)

    message = message_schema.load(incom_message)
    #?

    # load_user.user_id = user_id

    message.user_id = user_id
    message.save()
    return message_schema.jsonify(message), 200


    #! this also doesnt work

    # #? save request as a dict
    # incom_message = request.json
    # #? get the user who posted the message
    # user = User.query.get(user_id)

    # #?TRYING TO LOAD THE ID THEN SAVE HER?? WHY NO WORK?
    # covo_user_id = conversation_schema.load(conversation_id)
    # convo_id.save()

    # #? serialize the message
    # message = message_schema.load(incom_message)
    # #?
    # message.user = user
    
    # message.save()
    # return message_schema.jsonify(message), 200
