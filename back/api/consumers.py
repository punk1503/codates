# chat/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Message, Chat, CustomUser
from .serializers import MessageSerializer
from asgiref.sync import sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id_1 = self.scope['url_route']['kwargs']['user_id_1']
        self.user_id_2 = self.scope['url_route']['kwargs']['user_id_2']
        self.room_group_name = f'chat_{self.user_id_1}_{self.user_id_2}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    def get_serialized_message(self, json_data):
        return MessageSerializer(Message(user=self.scope['user'], text=json_data['text'])).data
    
    async def receive(self, text_data):
        json_load_data = json.loads(text_data)
        message = await database_sync_to_async(self.get_serialized_message)(json_load_data)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))
