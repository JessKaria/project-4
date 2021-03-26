from app import app, db
import json

#! Get all events

def test_get_all_events():
    client = app.test_client()
    response = client.get('/api/event')
    assert len(response.json) == 7

#! Seed Login

def test_login():
    client = app.test_client()
    login_data = {"password": "jess", "email": "jess@jess.com"}
    login_response = client.post('/api/login', data=json.dumps(login_data), content_type="application/json" )
    token = login_response.json['token']
    assert len(token) != 0


#! Register then login

def test_register():
    client = app.test_client()

    user_data = {
        "fullname":"Jess Karia", 
        "username":"21st June", 
        "password":"testing22",
        "email":"jessel@jessel.com", 
        "headline":"1 day", 
        "photo":"www.avatar.com"
    }

    user_response = client.post(
        "/api/register", 
        data=json.dumps(user_data), 
        content_type="application/json",
    )

    print(user_response.json)
    assert user_response.json['fullname'] == 'Jess Karia'


    login_data = {"password": "testing22", "email": "jessel@jessel.com"}
    login_response = client.post('/api/login', data=json.dumps(login_data), content_type="application/json" )
    token = login_response.json['token']
    assert len(token) != 0


#! Login and create event

def test_create_event():
    client = app.test_client()
    login_data = {"password": "jess", "email": "jess@jess.com"}
    login_response = client.post('/api/login', data=json.dumps(login_data), content_type="application/json" )
    token = login_response.json['token']

    events_data = {
        "name":"Event Test", 
        "date":"21st June", 
        "start_time":"2pm", 
        "duration":"1 day", 
        "description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
        "target_age":30, 
        "expected_attendees":20000,
        "location":"London",
        "image":"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }

    request_headers = {
        'Authorization': f'Bearer {token}'
    }

    event_response = client.post(
        "/api/event", 
        data=json.dumps(events_data), 
        content_type="application/json",
        headers=request_headers
    )

    print(event_response.json)
    assert event_response.json['name'] == 'Event Test'


#! Login and get message from user 2

def test_get_messages():
    client = app.test_client()
    login_data = {"password": "jess", "email": "jess@jess.com"}
    login_response = client.post('/api/login', data=json.dumps(login_data), content_type="application/json" )
    token = login_response.json['token']

    request_headers = {
        'Authorization': f'Bearer {token}'
    }

    client = app.test_client()
    message_response = client.get(
        '/api/convo-history/2',
        headers=request_headers    
    )
    print(message_response.json)
    assert len(message_response.json) == 6


#! Login and send message in convo 1

def test_create_convo():
    client = app.test_client()
    login_data = {"password": "jess", "email": "jess@jess.com"}
    login_response = client.post('/api/login', data=json.dumps(login_data), content_type="application/json" )
    token = login_response.json['token']

    convo_data = {}

    request_headers = {
        'Authorization': f'Bearer {token}'
    }

    convo_response = client.post(
        "/api/create-convo/6", 
        data=json.dumps(convo_data), 
        content_type="application/json",
        headers=request_headers
    )

    print(convo_response.json)
    assert len(convo_response.json) == 3

#! Login and send message in convo 1

def test_send_message():
    client = app.test_client()
    login_data = {"password": "jess", "email": "jess@jess.com"}
    login_response = client.post('/api/login', data=json.dumps(login_data), content_type="application/json" )
    token = login_response.json['token']

    message_data = {
        "subject":"This is a test message", 
        "message":"Body of a test message here."
    }

    request_headers = {
        'Authorization': f'Bearer {token}'
    }

    message_response = client.post(
        "/api/send-message/1", 
        data=json.dumps(message_data), 
        content_type="application/json",
        headers=request_headers
    )

    print(message_response.json)
    assert message_response.json['subject'] == 'This is a test message'







