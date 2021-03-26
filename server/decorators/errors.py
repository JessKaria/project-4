from app import app
from flask import Flask, jsonify
from marshmallow.exceptions import ValidationError
from sqlalchemy.orm import validates


@app.errorhandler(ValidationError)
def validation_error(e):
    return {"errors": e.messages, "messages": "UhOh! Something has gone wrong!"}

@app.errorhandler(Exception)
def generic_error(e):
    if (str(e) == 'You must have a valid email address'):
        return {"email": "You must have a valid email address"}, 405
    else:
        return {"username": "This username already exists, please use another one"}, 401

