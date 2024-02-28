from django.shortcuts import render
from rest_framework import permissions, viewsets, generics
from .models import *
from .serializers import *
from django.contrib.auth import get_user_model

class CustomUserCreateAPIView(generics.CreateAPIView):
    '''
    API endpoint to create CustomUser model instances.
    '''
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]