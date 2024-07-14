from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from .models import Chat
from .serializers import ChatsSerializer
from django.contrib.auth.models import User
from .pagination import CustomPaginationForChats

class ChatsListCreateView(ListCreateAPIView):
    serializer_class = ChatsSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPaginationForChats 

    def get_queryset(self):
        receiver_username = self.kwargs['receiver']
        return Chat.objects.filter(
            Q(sender=self.request.user, receiver__username=receiver_username) | 
            Q(sender__username=receiver_username, receiver=self.request.user)
        ).order_by('-date')

    def perform_create(self, serializer): #I am not using this code. 
        receiver_username = self.kwargs['receiver']
        receiver = User.objects.get(username=receiver_username)
        serializer.save(sender=self.request.user, receiver=receiver)
