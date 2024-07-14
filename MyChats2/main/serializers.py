from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import serializers
from .models import Chat,UserProfile


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        token, created = Token.objects.get_or_create(user=user)
        return {'user': user, 'token': token.key}


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field='username', queryset = User.objects.all())
    class Meta:
        model = UserProfile
        fields = ['user', 'is_online']


class ChatsSerializer(serializers.ModelSerializer):
    sender = serializers.SlugRelatedField(slug_field='username', queryset=User.objects.all(), required=False)
    receiver = serializers.SlugRelatedField(slug_field='username', queryset=User.objects.all(), required=False)
    date = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True) 

    class Meta:
        model = Chat
        fields = ['id', 'sender', 'receiver', 'message', 'date']
        read_only_fields = ['sender', 'date']
