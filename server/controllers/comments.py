from flask import Blueprint, request, g

from models.events import Event
from models.comments import Comment
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route
from serializers.events import EventSchema
from serializers.comments import CommentSchema
from sqlalchemy.exc import IntegrityError

event_schema = EventSchema()
comment_schema = CommentSchema()

router = Blueprint(__name__, 'comments')

#!---------COMMENTS------------!#

@router.route('/event/<event_id>/comments', methods=['POST'])
@secure_route
def create_comment(event_id):
    comment_dict = request.json
    event_d = Event.query.get(event_id)
    if not event_d:
        return 'No event exists!', 200
    try:
        comment = comment_schema.load(comment_dict)
        comment.event = event_d
        comment.user_id = g.current_user.id
    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'UhOh! Unexpected Error!'  }
    comment.save()
    return comment_schema.jsonify(comment)


@router.route('/event/<event_id>/comments/<comment_id>', methods=['DELETE'])
@secure_route
def delete_comment(event_id, comment_id):
    comment = Comment.query.get(comment_id)
    if comment.event_id != g.current_user.id:
        return { 'You cannot delete a comment you havent made?' }
    comment.remove()
    event = Event.query.get(event_id)
    event.save()
    return comment_schema.jsonify(event), 202