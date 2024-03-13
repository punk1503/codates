from rest_framework import serializers
from .models import *

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['password', 'username', 'first_name', 'last_name', 'telephone_number', 'age', 'gender', 'city', 'technologies']
        extra_kwargs = {
            'password': {
                'error_messages': {
                    'required': 'Пароль: обязательное поле.',
                    'blank': 'Пароль: обязательное поле.',
                }
            },
            'username': {
                'error_messages': {
                    'required': 'Юзернейм: обязательное поле.',
                    'blank': 'Юзернейм: обязательное поле.',
                }
            },
            'age': {
                'error_messages': {
                    'required': 'Возраст: обязательное поле.',
                    'blank': 'Возраст: обязательное поле.',
                }
            },
            'gender': {
                'error_messages': {
                    'required': 'Пол: обязательное поле.',
                    'blank': 'Пол: обязательное поле.',
                }
            },
            'technologies': {
                'error_messages': {
                    'required': 'Технологии: обязательное поле.',
                    'blank': 'Технологии: обязательное поле.',
                }
            },
        }
    def create(self, validated_data):
        technologies = validated_data.pop('technologies')
        user = CustomUser.objects.create_user(**validated_data)
        user.technologies.set(technologies)
        return user

class CustomUserGradesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUserGrades
        fields = '__all__'

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['id', 'name']

class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields  = '__all__'