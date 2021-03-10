from app import app, db
from data.user_data import list_users
from data.messages_data import list_messages





with app.app_context():
    
    try:
        db.drop_all()
    #? this is straight up magic - will create and RUN SQL
        db.create_all()

        db.session.add_all(list_users)
        db.session.commit()
        

        db.session.add_all(list_messages)
        db.session.commit()


        print('🤞🥶🍷  Everythang committed!')
    except Exception as e:
        print('There was an error.')
        print(e)