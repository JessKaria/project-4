from flask import Blueprint, request


router = Blueprint(__name__, 'users')


@router.route('/register', methods=['GET'])
def register():
    return 'This works', 200