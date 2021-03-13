from flask import Blueprint, request, g
from decorators.secure_route import secure_route
from models.user import User
from serializers.user import UserSchema
from marshmallow.exceptions import ValidationError

user_schema = UserSchema()

router = Blueprint(__name__, 'users')



#?Register for the app

@router.route('/register', methods=['POST'])
def register():
    try:
        user = user_schema.load(request.json)
    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong.' }
    user.save()
    return user_schema.jsonify(user), 200

#? login
@router.route('/login', methods=['POST'])
def login(): 
    user = User.query.filter_by(email=request.json['email']).first()
    if not user:
        return { 'message': 'Does not exist!' }
    if not user.validate_password(request.json['password']):
        return { 'message': 'You are not authorized!' }, 402
    token = user.generate_token()
    return { 'token': token, 'message': 'Welcome to the hood. ' }


#? get all users

@router.route('/users', methods=['GET'])
@secure_route
def users(): 
    all_users = User.query.all()
    return user_schema.jsonify(all_users, many=True)


#? get your profile

@router.route('/profile', methods=['GET'])
@secure_route
def get_profile():
    return user_schema.jsonify(g.current_user)

#? edit profile

@router.route('/edit-profile/<user_id>', methods=['PUT'])
@secure_route
def edit_profile(user_id):
    profile_dict = request.json
    user_edit = User.query.get(user_id)
    if user_edit != g.current_user:
        return {'errors': 'This is not your profile ☠️!'}, 402
    try: user = user_schema.load(
        profile_dict,
        instance=user_edit,
        partial=True
    )
    except ValidationError as e:
        return {"errors": e.messages, "messages": "Something went wrong"}
    user.save()
    return user_schema.jsonify(user), 201
