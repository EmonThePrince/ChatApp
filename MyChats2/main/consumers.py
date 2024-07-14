# your_app/consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from .models import Chat,UserProfile

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if not self.scope['user'].is_authenticated:
            await self.send(text_data=json.dumps({
                'error': 'you are not logged in'
            }))
            await self.close()
            return

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        #updating user profile status to online
        user_profile = await self.get_user_profile(self.scope['user'])
        await self.update_user_profile(user_profile,True)

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        #updating user porfile status to offline
        user_profile = await self.get_user_profile(self.scope['user'])
        await self.update_user_profile(user_profile,False)


    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        receiver_name = self.getReceiver()
        receiver = await self.get_user(receiver_name)
        sender = self.scope['user']
        
        chat = await self.create_chat(receiver, sender, message)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))

    # Custom methods
    def getReceiver(self):
        return self.room_name.replace(self.scope['user'].username, '')

    @database_sync_to_async
    def get_user(self, username):
        return User.objects.get(username=username)
    
    @database_sync_to_async
    def get_user_profile(self,user):
        return UserProfile.objects.get(user = user)
        
    
    @database_sync_to_async
    def update_user_profile(self,user_profile, value):
        user_profile.is_online = value
        user_profile.save()

    @database_sync_to_async
    def create_chat(self, receiver, sender, message):
        chat = Chat(
            receiver=receiver,
            sender=sender,
            message=message
        )
        chat.save()
        return chat
