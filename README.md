# README


### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, SEI 


## Huddle | 7 Day Solo Project π€


## Overview
For final project at General Assembly, we were asked to build a full-stack web application by building our own front and back-end, I chose to go solo, as I wanted to challenge myself to write every line of code, and intern hopefully deepen my understanding of the new technologies and languages we had learnt.

## Brief π π¨πΎβπ»

* Build a **full-stack application** by making your own **back-end** and your own **front-end**
* Use a **Flask API** to serve your data from a **Postgres database**
* **Consume your API with a separate front-end** built with React
* Be a complete product which most likely means **multiple relationships and CRUD functionality** for at least a couple of models
* Implement thoughtful **user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Be deployed online** so it's publicly accessible.

You can view my App deployed here on Heroku [here](https://huddle-sei.herokuapp.com/), or find the GitHub repo [here](https://github.com/JessKaria/project-4).

To explore the app you can login with the below details:

* **Email:** jess@jess.com
* **Password:** jess


## Introducing, Huddle! π·πΊπΏ

Leaning on my previous experience in marketing, and love for live events I decided to build a full-stack social network where users can create events they are hosting, but they can also private message users.
 
![here](https://github.com/JessKaria/project-4/blob/main/image/huddleScreen.png?raw=true)

## Technologies π»

* Python
* Flask
* Marshmallow
* SQLAlchemy
* PostgreSQL
* Bcrypt
* Pytest
* SCSS
* JavaScript (ES6)
* React.js
* Axios
* React Router DOM
* React Hook Forms
* VS code
* Pipenv
* NPM
* Supertest
* Insomnia
* Git
* Github
* Google Chrome dev tools
* Heroku (deployment)
* Canva
* Babel
* JSX
* SASS

## Planning π

![here](https://github.com/JessKaria/project-4/blob/main/image/Add%20a%20heading%20(1).png?raw=true)

Working solo was at first quite intimidating, and my plans were quite ambitious for the timeframe we had, however I spent the first day planning out my time, setting achiveable milestones and gave myself accountability to ensure the project would be delivered on time.

* Back-end - Day 2, 3, 4
* Front-end - Day 4, 5, 6, 7
* Deployment - Full Day

## Models π

![here](https://raw.githubusercontent.com/JessKaria/project-4/main/image/Screenshot%202021-03-26%20at%2022.49.22.png)

To get a clear understanding of how my models would interact, I used an Entity Relationship Diagram which helped visualise the relationships aswell helping me understand of fields my tables would contain.

## Creating messaging relationships π²

The entire crux of my application was centered around users being able to private message other users in relation to an event they created. Without it, I don't think the users would be able to get any real value from it. This was an essential feature and one that I persevered with to create.

Firstly I did some some research on how to best structure tables so that the users messages would be private and would not exist all in one table. I came across a few relationship diagrams where the use of a conversation table which containted two user ID's could be used to then group messages. It took me a while to get my head around, but once I wrote out my models and started testing requests in Insomnia, things became a lot clearer.

The first challenge was to create models that contained the correct foreign keys that they were refrencing, I knew that a join table wouldn't suffice so I worked out how to have two userID's on the conversation table which was a huge win and allowed me to start writing controllers and testing.

## User Model π€·πΏββοΈ

The user model contained all the information we would collect at the form input. Here I specified the datatypes and also the relationships to other tables. Users have a relationship with the Conversation table with an explicit refrence to the foreign keys.

```
class User(db.Model, BaseModel):
    __tablename__ = 'users'
    fullname = db.Column(db.String(20), nullable=False, unique=True)
    username = db.Column(db.Text, nullable=False, unique=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    headline = db.Column(db.String(400))
    photo = db.Column(db.Text)


    #?relationship to conversation & message

    events = db.relationship('Event', backref='user', cascade="all, delete")
    comments = db.relationship('Comment', backref='user', cascade="all, delete")
    messages = db.relationship('Message', backref='user', cascade='all, delete')
    
    #? two sides of the conversation have their ID's stored in the conversation table

    userone = db.relationship('Conversation', backref='userone', foreign_keys = 'Conversation.userone_id') 
    usertwo = db.relationship('Conversation', backref='usertwo', foreign_keys = 'Conversation.usertwo_id') 

```
## Conversation Model ππΏββοΈ ππΎ

The conversation model, is slightly shorter as it is not user facing and only populated to organise users messages into private conversations. When a user goes to message another user it would put both ID's into this table and the conversation ID would mark a private conversation with the user who initiated the conversation and the user who created the event.

```
class Conversation(db.Model, BaseModel):
    __tablename__ = 'conversations'

    
    #? conversation relationship with message
    
    convo = db.Column(db.Text)
    c_messages = db.relationship('Message', backref='users', cascade='all, delete')


    #?this needs two FK userids
    
    userone_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
    usertwo_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'))
```
## Messages Model π¬

The messaging model is the final piece in this three way puzzle and one that is super easy to understand, it contains the inputs of the message and houses the FK of a user and the conversation that the user has sent that particular message in. Now, if you wanted to retrieve private messages between yourself and a user you can just just look up the conversation ID in this table, there will only every be two users in one coversation. 

```
class Message(db.Model, BaseModel):
    __tablename__ = 'messages'

    subject = db.Column(db.Text, nullable=False)
    message = db.Column(db.Text, nullable=True)

    #?FK conversationid 
    #? and user ID to go on the message

    #!2
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"))
    
    #! 1
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversations.id', ondelete="CASCADE"))

```
## Other models π’
I set out witht he best intentions of creating comments, and the ability for users to add category types to their events, all the controllers and functionality were built. However due to time contraints I had to drop them when I reached the front-end in the pursuit of delivering a strong messaging experience.


## Messaging Framework

![here](https://github.com/JessKaria/project-4/blob/main/image/Add%20a%20heading.png?raw=true)

Understanding my models and then getting the behaviour I wanted from my controllers proved to be quite challenging, however I eventually emerged from circular import hell with a clear idea about how this would work.

I drew out a diagram of how I wanted the front end to work and then began writing my controllers. If you land on an Event page, I would need to check that a conversation doesn't already exist, if it does - return that and allow users to send a message to that ID.

If it doesn't there needs to be a way to create a conversation and then return it and have the ability to send messages to that conversation.

More on this later...

## Controllers

Checking a conversation exists...

```
@router.route('/check-convo/<user2_id>', methods=['GET'])
@secure_route

def check_conversation_exists(user2_id):
    current_user = g.current_user.id
    conversation = Conversation.query.filter_by(userone_id=current_user, usertwo_id=user2_id).all()
    conversation2 = Conversation.query.filter_by(userone_id=user2_id, usertwo_id=current_user).all()
    if conversation:
        return conversation_schema.jsonify(conversation, many=True)
    elif conversation2:
        return conversation_schema.jsonify(conversation2, many=True)
    else: 
        return ''
```

Create a conversation 

```
@router.route('/create-convo/<user_two_id>', methods=['POST'])
@secure_route
def create_conversation(user_two_id):
        convo = request.json
        load_convo = conversation_schema.load(convo)
        load_convo.userone_id = g.current_user.id
        load_convo.usertwo_id = user_two_id
        print(load_convo)
        load_convo.save()
        return conversation_schema.jsonify(load_convo), 200
        
```

Get conversations by ID

```
@router.route('/convo-history/<convo_id>', methods=['GET'])
@secure_route
def get_conversation(convo_id):
    convo_history = Message.query.filter_by(conversation_id=convo_id)
    return message_schema.jsonify(convo_history, many=True)
    
```

Send a message

```
@router.route('/sent', methods=['GET'])
@secure_route
def get_sent_messages():
    all_messages = Conversation.query.filter_by(usertwo_id=g.current_user.id)
    return conversation_schema.jsonify(all_messages, many=True)
    
```


## Controllers continued

I spent around half a day testing my routes in Insomnia, I asked myself the below questions and ensured that the data was being populated correctly and that I could retrieve chat history and the users that sent those messages as well as being able to successfully create a conversation and send new messages.

* Sending a blank response do I get a response?
* Do I get the correct response?
* Do I get the correct data and only what information I need?
* Can I access the data without authentication?
* Can I access the data with the wrong authentication?
* Do I get the correct response when sending no JSON data?
* Do I get the correct response when sending the wrong JSON data?
* Do I get the correct data when authentication and JSON are correct?

Once I was happy with the outputs I looked at setting up a testing enviroment to test those routes and the messaging journey end to end.

```
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

```

## Front-End

As I moved on to the front-end, my first focus was building out registration, login and create event forms, then I wanted to focus my attention to building out messaging.

![here](https://github.com/JessKaria/project-4/blob/main/image/2.png?raw=true)


## Registration
I made all the fields on the registration required except the image upload, so that I could capture the most information and also ensure the data delivered to the back-end was that of a complete profile.

![here](https://github.com/JessKaria/project-4/blob/main/image/4.png?raw=true)

I gave the image upload a default value which would populate the user profile with a default avatar image.

```
  const [formData, updateFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    headline: '',
    photo: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
  })

```
![here](https://github.com/JessKaria/project-4/blob/main/image/2.png?raw=true)

## Login
For login, I wanted to have some more robust error handling so I opted to use React Hook Forms, if I had more time I think I would have liked to implement this across all the forms on the app.

![here](https://github.com/JessKaria/project-4/blob/main/image/6.png?raw=true)

The form had validation on the length of the password as well as requiring a valid email address. In addition, for any in correct details I was able to render an 'Invalid Credentials' warning error.

![here](https://github.com/JessKaria/project-4/blob/main/image/8.png?raw=true)

## Dashboard
After logging in the user lands on a dashboard which renders information on how many events are on the platform amongst other things.

![here](https://github.com/JessKaria/project-4/blob/main/image/9.png?raw=true)


## Messaging

On the dashboard, I am executing an axios fetch request then mapping over over the events. A user can then click through to an event detail page where they can initiate a chat or create a chat with the user that created that event.

When the page loads, I am running several fetch requests to render the data for that event on the page, but also checking the conversation table to see if a 'chat' between the two users.

## Conversation already exists...

If the conversation exists, I used a ternary to display a button where users can submit a request to retrive chat history with that user, it will also show a form where a user can send subject and message to that user.

![here](https://github.com/JessKaria/project-4/blob/main/image/10.png?raw=true)

![here](https://github.com/JessKaria/project-4/blob/main/image/11.png?raw=true)

## Conversation does not exist...

If the conversation does not exist, the ternary will render a slightly different page, showing users a button to create a conversation, once clicked it will create a conversation and reload the page thus rendering the above page.

And all functionality exists the same, a user can then message the owner of the event through the form and also then retrieve messages in the same manner.

![here](https://github.com/JessKaria/project-4/blob/main/image/12.png?raw=true)

![here](https://github.com/JessKaria/project-4/blob/main/image/13.png?raw=true)


## Messaging continued.

As mentioned delivering a strong, secure and private messaging experience was key to the app and I am happy with how it was delivered. In hindsight I wish I was able to add in followers and following and also refactor all the code fromt the messaging component into smaller seperate reusable components, however time just wasnt on my side.

## Challenges

* This was my first time building a backend in Python and also using Flask and an SQL database. Without a doubt the biggest challenge was understanding the relationships between my models. I felt comfortable building the relationships between users and events, however once I moved too private messaging, thing became a lot harder to understand - this required visual tools in the form of my ERD but also actually building some test controllers to test how requests behaved in Insomnia.

* Validation and error handling is something else I am looking to spend more time with, on my previous project I felt I had a good understanding of how to validate data before it enters the database, on this particular project, I think I could have done a lot more robust validation on the backend.

* The whole crux of this application was around delivering a private messaging and I wish I had spent more time considering how this would work for a user before coding, whilst I am happy with what I built - I can already think of a hundred things I would like to do differently.

## Lessons learned

Hands down this was one of favourite projects to date, it gave me a chance to practice writing Python, which we had only learned in the last two weeks - it was a hugely fulfilling experience as I was able to see the similarities and differences to JavaScript. I felt as the week went on, I became much more comfortable writing Python.

At the beginning of the project, I has never built anything to this scale working solo and it was extremely intimidating. Not only that, I would be coding in a brand new language as well as using new technologies. Without a team to troubleshoot issues with, I leaned heavily on documentation and breaking down bugs until I was able to crack them. Not only did this sharpen my debugging skills, but I feel much more comfortable reading technical documentation.

If I had the chance to go back, I think I would cut comments and have implemented a 'friends' model where users can follow and be followed by other users. I think I underestimated how long things would take and how complex private messaging would prove to be.

Leveraging a CSS framework, in previous projects I have struggled getting Bulma replicate my vision, but in this project I used the framework for basic scaffolidng and felt much more comfortable here.

The last lesson would be to build in some time for refactoring code, I think generally most of the application is well structured but there a few components that could definatley use some work.


## Future Features

* React Hook Forms across app
* Refactor code in messaging component
* Add follower and following join table 
* Better validation on the front end
* The events don't have location on
* Write some more tests
* Spend more time on styling
* Kickback email when someone signs up




