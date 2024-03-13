from rest_framework import serializers
from .models import *

from rest_framework import serializers

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['password', 'username', 'first_name', 'last_name', 'telephone_number', 'age', 'gender', 'city', 'technologies']
        extra_kwargs = {
            'password': {
                'error_messages': {
                    'required': 'Пароль: обязательное поле.',
                    'blank': 'Пароль: не может быть пустым.',
                    'max_length': 'Пароль: слишком длинный.',
                    'min_length': 'Пароль: слишком короткий.'
                }
            },
            'username': {
                'error_messages': {
                    'required': 'Юзернейм: обязательное поле.',
                    'blank': 'Юзернейм: не может быть пустым.',
                    'max_length': 'Юзернейм: слишком длинный.',
                    'min_length': 'Юзернейм: слишком короткий.'
                }
            },
            'age': {
                'error_messages': {
                    'required': 'Возраст: обязательное поле.',
                    'blank': 'Возраст: не может быть пустым.',
                    'invalid': 'Возраст: недопустимое значение.',
                    'max_value': 'Возраст: слишком большое значение.',
                    'min_value': 'Возраст: слишком маленькое значение.'
                }
            },
            'gender': {
                'error_messages': {
                    'required': 'Пол: обязательное поле.',
                    'blank': 'Пол: не может быть пустым.',
                    'choices': 'Пол: недопустимое значение.',
                    'invalid_choice': 'Пол: должно быть допустимым значением.',
                }
            },
            'technologies': {
                'error_messages': {
                    'required': 'Технологии: обязательное поле.',
                    'blank': 'Технологии: не может быть пустым.',
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