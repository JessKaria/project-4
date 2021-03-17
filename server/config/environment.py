import os


db_URI = os.getenv('DATABASE_URL', 'postgres://localhost:5432/events_app_db')
secret = os.getenv('SECRET', 'rusty maud salmon cheese finger lasvegas kanye bush')