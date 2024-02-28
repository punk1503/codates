from rest_framework import serializers
from .models import *

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['password', 'username', 'first_name', 'last_name', 'telephone_number', 'age', 'gender', 'city']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

class CustomUserGradesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUserGrades
        fields = '__all__'