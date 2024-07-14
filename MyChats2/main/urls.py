from django.urls import path
from .views import *

from .chatViews import *


urlpatterns = [
    path('register', Register.as_view(), name='register'),
    path('login', Login.as_view(), name='login'),
    # path('profile',  name='profile'),
    path('chats/<str:receiver>/', ChatsListCreateView.as_view(), name='chats-list'), #returns all the chats with between current user and reciever
    path('users/', UserProfileList.as_view(), name='user-list') #returns all the profiles with active status
]