from app import app
from flask import Flask, jsonify
from marshmallow.exceptions import ValidationError
from sqlalchemy.orm import validates

@app.errorhandler(ValidationError)
def validation_error(e):
    return {"errors": e.messages, "messages": "UhOh! Something has gone wrong!"}

@app.errorhandler(Exception)
def general_error(e):
    return {"errors": str(e), "messages": "Something went wrong"}

@app.errorhandler(AssertionError)
def assertion_error(e):
    return { "messages": str(e)  }, 400

@app.errorhandler(AttributeError)
def attribute_error(e):
    return { "errors": str(e), "messages": "Something went wrong" }, 400