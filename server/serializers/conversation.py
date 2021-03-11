from app import ma
from models.conversation import Conversation

class ConversationSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Conversation
        load_instance = True
