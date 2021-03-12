from flask import Blueprint, request

from models.events import Event
from models.comments import Comment
from marshmallow.exceptions import ValidationError


from serializers.events import EventSchema
from serializers.comments import CommentSchema


from sqlalchemy.exc import IntegrityError

event_schema = EventSchema()
comment_schema = CommentSchema()


router = Blueprint(__name__, 'event')


@router.route('/event', methods=['GET'])
def get_all_events():
    all_events = Event.query.all()
    return event_schema.jsonify(all_events, many=True)


@router.route('/event/<event_id>', methods=['GET'])
def get_single_event(event_id):
    single_event = Event.query.get(event_id)
    if not single_event:
        return { 'message': 'Sory no event with that ID exists' }
    return event_schema.jsonify(single_event), 200


@router.route('/event', methods=['POST'])
def create_event():
    event_dict = request.json
    try:
        event = event_schema.load(event_dict)
    except ValidationError as e:
        return { 'errors': e.messages, 'messages': ' Aye papi! Somethang wrong!' }
    try: 
        event = event_schema.load(event_dict)
    except IntegrityError:
        return 'ID already taken !'
    event.save()
    return event_schema.jsonify(event), 200


@router.route('/event/<event_id>', methods=['PUT'])
def edit_event(event_id):
    find_event = Event.query.get(event_id)
    event_dict = request.json

    try:
        event = event_schema.load(
            event_dict,
            instance=find_event,
            partial=True
        )
    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong!' }
    event.save()
    return event_schema.jsonify(event)


@router.route('/event/<event_id>', methods=['DELETE'])
def delete_event(event_id):
    event = Event.query.get(event_id)
    event.remove()
    return { 'message': 'Event has been deleted!!' }, 200


#!---------COMMENTS------------!#

@router.route('/event/<event_id>/comments', methods=['POST'])
def create_comment(event_id):
    comment_dict = request.json
    event_d = Event.query.get(event_id)

    try:
        comment = comment_schema.load(comment_dict)
        comment.event = event_d
    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'UhOh! Unexpected Error!'  }
    comment.save()
    return comment_schema.jsonify(comment)


@router.route('/event/<event_id>/comments/<comment_id>', methods=['DELETE'])
def delete_comment(event_id, comment_id):
    comment = Comment.query.get(comment_id)
    comment.remove()
    event = Event.query.get(event_id)
    event.save()
    return comment_schema.jsonify(event),







