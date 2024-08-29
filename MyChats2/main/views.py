from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import UserSerializer, LoginSerializer, UserProfileSerializer
from rest_framework.generics import ListAPIView
from django.contrib.auth.models import User
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from .pagination import CustomPaginationForUsers
from .models import UserProfile
#authentication 
class Register(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user_data = serializer.save()
            UserProfile.objects.create(user = user_data['user'], is_online = False)
            user_serializer = UserSerializer(user_data['user'])
            return Response({
                'user': user_serializer.data,
                'token': user_data['token']
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Login(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserProfileList(ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = UserProfile.objects.all().order_by('user')
    serializer_class = UserProfileSerializer
    filter_backends = [SearchFilter] 
    search_fields = ['user']
    pagination_class = CustomPaginationForUsers
    

    

# Sample Request Payload:
# {
# "username": "emon",
# "email": "emo@gmail.com",
# "password": "123"
# }