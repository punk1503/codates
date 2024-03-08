from django.shortcuts import render
from rest_framework import permissions, viewsets, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *
from django.contrib.auth import get_user_model
from django.middleware.csrf import get_token

class CustomUserCreateAPIView(generics.CreateAPIView):
    '''
    API ендпоинт для регистрации пользователей.
    '''
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]

class CustomUserGradesCreateApiView(generics.CreateAPIView):
    '''
    API ендпоинт для отправки лайков и дизлайков.
    '''
    queryset = CustomUserGrades
    serializer_class = CustomUserGradesSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['GET'])
def get_matched_user(request):
    '''
    API ендпоинт для получения наиболее подходяшего пользователя (мэтч).
    '''
    return Response(CustomUserSerializer(request.user.match()))

@api_view(['GET'])
def get_csrf_token(request):
    '''
    API ендпоинт для получения csrf токена.
    '''
    csrf_token = get_token(request)
    return Response({'csrf_token': csrf_token})

def whoami(request):
    '''
    API ендпоинт для получения данных о текущем пользователе.
    '''
    return request.user