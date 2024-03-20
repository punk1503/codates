# chat/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Message, Chat, CustomUser
from .serializers import MessageSerializer
from asgiref.sync import sync_to_async
from django.db.models import Q

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_1 = self.scope['user']
        self.user_id_1 = self.user_1.id
        self.user_id_2 = int(self.scope['url_route']['kwargs']['receiver_id'])
        self.user_2 = await database_sync_to_async(CustomUser.objects.get)(id=self.user_id_2)
        self.room_group_name = f'chat_{min(self.user_id_1, self.user_id_2)}_{max(self.user_id_1, self.user_id_2)}'

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
    
    def get_serialized_message(self, message: Message):
        return MessageSerializer(message).data
    
    def get_message(self, json_data) -> Message:
        return Message(user=self.scope['user'], text=json_data['text'], chat=Chat.objects.get(Q(user1=self.user_1, user2=self.user_2) | Q(user1=self.user_2, user2=self.user_1)))

    async def receive(self, text_data):
        json_load_data = json.loads(text_data)
        message = await database_sync_to_async(self.get_message)(json_load_data)
        serialized_message = await database_sync_to_async(self.get_serialized_message)(message)
        await database_sync_to_async(message.save)()
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': serialized_message
            }
        )

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))
