from app import app, db
import json 

def test_users():

    client = app.test_client()
    response = client.get('/api/event')

    assert len(response.json) == 6
