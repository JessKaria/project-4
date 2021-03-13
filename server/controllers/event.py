from flask import Blueprint, request, g
from models.events import Event
from models.category import Category
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route
from serializers.events import EventSchema
from serializers.category import CategorySchema
from sqlalchemy.exc import IntegrityError

event_schema = EventSchema()
category_schema = CategorySchema()

router = Blueprint(__name__, 'event')

#? get all the events

@router.route('/event', methods=['GET'])
def get_all_events():
    all_events = Event.query.all()
    return event_schema.jsonify(all_events, many=True)

#? get single event

@router.route('/event/<event_id>', methods=['GET'])
def get_single_event(event_id):
    single_event = Event.query.get(event_id)
    if not single_event:
        return { 'message': 'Sory no event with that ID exists' }
    return event_schema.jsonify(single_event), 200


#? create an event

@router.route('/event', methods=['POST'])
@secure_route
def create_event():
    event_dict = request.json
    try:
        event = event_schema.load(event_dict)
        event.users = g.current_user
    except ValidationError as e:
        return { 'errors': e.messages, 'messages': ' Aye papi! Somethang wrong!' }
    event.save()
    return event_schema.jsonify(event), 200

#? edit an event

@router.route('/event/<event_id>', methods=['PUT'])
@secure_route
def edit_event(event_id):
    find_event = Event.query.get(event_id)
    event_dict = request.json
    if find_event.users != g.current_user:
        return {'errors': 'This is not your event to edit ☠️!'}, 402
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

#? delete an event

@router.route('/event/<event_id>', methods=['DELETE'])
def delete_event(event_id):
    event = Event.query.get(event_id)
    if event.user_id != g.current_user:
        return {'errors': 'This is aint your event!'}, 402
    event.remove()
    return { 'message': 'Event has been deleted!!' }, 200

#? get all categories

#!-------GET CATEGORIES-----------#!
@router.route('/category', methods=['GET'])
def get_category():
    category = Category.query.all()
    return category_schema.jsonify(category, many=True), 200

#? add categories to the event!

#! need so you can post this via a form
@router.route('/event/<event_id>/category/<category_id>', methods=['POST'])
def add_category(event_id, category_id):
    event = Event.query.get(event_id)
    category = Category.query.get(category_id)
    event.category.append(category)
    event.save()
    return event_schema.jsonify(event), 200


