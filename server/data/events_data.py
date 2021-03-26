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
        name="Tupac Live at the Apollo!!", 
        date="21st June", 
        start_time="2pm", 
        duration="1 day", 
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
        target_age=30, 
        expected_attendees=20000,
        location="Dubai",
        image="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", 
        user_id=1, 
        category=list_categories),
    Event(
        name="Beyonce Live in Concert", 
        date="21st June", 
        start_time="2pm", 
        duration="1 day", 
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", 
        target_age=50, 
        expected_attendees=40000,
        location="London", 
        image="https://images.unsplash.com/photo-1478147427282-58a87a120781?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", 
        user_id=2),
    Event(
        name="Shaggy Live in Concert", 
        date="20th June", 
        start_time="2pm", 
        duration="1 day", 
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",  
        target_age=30,
        location="Germany", 
        expected_attendees=40000, 
        image="https://images.unsplash.com/photo-1541683142766-bd6163178577?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", 
        user_id=3),
    Event(
        name="Glastonbury", 
        date="20th June", 
        start_time="3pm", 
        duration="1 day", 
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",  
        target_age=30,
        location="Sydney", 
        expected_attendees=40000, 
        image="https://images.unsplash.com/photo-1598387992619-f86d5293bace?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80", 
        user_id=4),
    Event(
        name="Secret Garden Party", 
        date="20th June", 
        start_time="2pm", 
        duration="1 day", 
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",  
        target_age="30",
        location="Birmingham", 
        expected_attendees=40000, 
        image="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80", 
        user_id=5),
    Event(
        name="Beer festival", 
        date="20th June", 
        start_time="2pm", 
        duration="1 day", 
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",  
        target_age="30",
        location="Berlin", 
        expected_attendees=40000, 
        image="https://images.unsplash.com/photo-1506157786151-b8491531f063?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80", 
        user_id=6),
    Event(
        name="Usher live in Concert", 
        date="20th June", 
        start_time="2pm", 
        duration="1 day", 
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",  
        target_age="30",
        location="Tokyo", 
        expected_attendees=40000, 
        image="https://images.unsplash.com/photo-1514605411468-81f98844a475?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80", 
        user_id=1),

]


