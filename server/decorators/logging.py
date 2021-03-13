from app import app
from flask import Flask, jsonify, request


@app.before_request
def log():
    print(f'  🤞 Request Method: {request.method}')
    print(f'  👩‍💻 Request URL: {request.url}')
    print(f'  😜 Request Body: {request.json}')
    print(f'  🥶 Request Headers: {request.headers}')