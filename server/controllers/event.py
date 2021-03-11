from flask import Blueprint, request

from models.events import Event
from marshmallow.exceptions import ValidationError
from serializers.events import EventSchema
from sqlalchemy.exc import IntegrityError

event_schema = EventSchema()



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






