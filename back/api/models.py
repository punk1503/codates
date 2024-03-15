from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import status

class CustomUser(AbstractUser):
    THEMES = {
       ('atom-one-dark', 'Atom One Dark')
    }
    telephone_number = PhoneNumberField(null=True, blank=False, unique=True)
    age = models.IntegerField(null=False, blank=False)
    gender = models.BooleanField() # true for male, false for female
    city = models.ForeignKey('City', on_delete=models.SET_NULL, null=True)
    technologies = models.ManyToManyField('Technology')
    code_snippet = models.TextField(default='print("I love CoDates!")')
    code_theme = models.CharField(choices=THEMES, max_length=255)
    description = models.CharField(max_length=255)
    def match(self):
        unmatched_users = CustomUser.objects.exclude(id=self.id).exclude(id__in=CustomUserGrades.objects.filter(user_from=self.id).values_list('user_to'))
        if len(unmatched_users) > 0:
            return unmatched_users[0]

class City(models.Model):
    name = models.CharField(max_length=255)
    latitude = models.FloatField()

class Technology(models.Model):
    name = models.CharField(max_length=25)
    background_color = models.CharField(max_length=7)  # assuming hex color code, e.g., '#FFFFFF'
    text_color = models.CharField(max_length=7)

class CustomUserGrades(models.Model):
    user_from = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='user_who_graded')
    user_to = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='graded_user')
    grade = models.BooleanField() # true for like, false for dislike

class ProfilePicture(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='profile_picture')
    image = models.FileField()