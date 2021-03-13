from models.events import Event
from models.category import Category


list_categories = [
    Category(category="business"),
    Category(category="food"),
    Category(category="health"),
    Category(category="music"),
    Category(category="charity"),
    Category(category="community"),
    Category(category="fashion"),
    Category(category="film"),
    Category(category="hobbies"),
    Category(category="government"),
    Category(category="science"),
]



list_events = [
    Event(
        name="Glasto", 
        date="20th June", 
        start_time="2pm", 
        duration="1 day", 
        description="pretty cool event", 
        target_age="30", 
        expected_attendees="40,000", 
        image="www.photo.com", 
        user_id=1, 
        category=list_categories),
    Event(
        name="Glasto1", 
        date="20th June", 
        start_time="2pm", 
        duration="1 day", 
        description="pretty cool event", target_age="30", expected_attendees="40,000", image="www.photo.com", user_id=2),
    Event(
        name="Glasto2", 
        date="20th June", 
        start_time="2pm", 
        duration="1 day", 
        description="pretty cool event", 
        target_age="30", 
        expected_attendees="40,000", 
        image="www.photo.com", 
        user_id=3),
    Event(name="Glasto3", 
        date="20th June", 
        start_time="2pm", 
        duration="1 day", 
        description="pretty cool event", 
        target_age="30", 
        expected_attendees="40,000", 
        image="www.photo.com", 
        user_id=4),
    Event(
        name="Glasto4", 
        date="20th June", 
        start_time="2pm", 
        duration="1 day", 
        description="pretty cool event", 
        target_age="30", 
        expected_attendees="40,000", 
        image="www.photo.com", 
        user_id=1),
    Event(
        name="Glasto5", 
        date="20th June", 
        start_time="2pm", 
        duration="1 day", 
        description="pretty cool event", 
        target_age="30", 
        expected_attendees="40,000", 
        image="www.photo.com", user_id=2),
]


