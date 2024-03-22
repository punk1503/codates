from rest_framework import serializers
from .models import *

from rest_framework import serializers

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'password', 'username', 'first_name', 'last_name', 'telephone_number', 'age', 'gender', 'city', 'technologies', 'code_snippet', 'code_theme', 'description']
        extra_kwargs = {
            'password': {
                'error_messages': {
                    'required': 'Пароль: обязательное поле.',
                    'blank': 'Пароль: не может быть пустым.',
                    'max_length': 'Пароль: слишком длинный.',
                    'min_length': 'Пароль: слишком короткий.'
                },
                'write_only': True,
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
            'code_snippet': {
                'required': False,
            },
            'code_theme': {
                'required': False
            },
            'description': {
                'required': False,
            },
        }

    def create(self, validated_data):
        technologies = validated_data.pop('technologies')
        user = CustomUser.objects.create_user(**validated_data)
        user.technologies.set(technologies)
        return user
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['images'] = [ProfilePictureSerializer(picture).data for picture in ProfilePicture.objects.filter(user=instance)]
        representation['technologies'] = [TechnologySerializer(tech).data for tech in instance.technologies.all()]
        representation['city'] = CitySerializer(City.objects.get(id=representation['city'])).data
        return representation

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

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
    
class ProfilePictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfilePicture
        fields = ['user', 'image']

class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = '__all__'

    def to_representation(self, instance):
        sender = None
        receiver = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            sender = request.user
            receiver = instance.user1 if instance.user1 != sender else instance.user2
            
        representation = {}
        representation['user'] = CustomUserSerializer(receiver).data
        return representation

class MessageSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    class Meta:
        model = Message
        fields = ['user', 'text']


