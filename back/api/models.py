from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.db.models import F, Q, CheckConstraint

class CustomUser(AbstractUser):
    cities = (
        ('MSC', 'Москва'),
        ('SPB', 'Санкт-Петербург'),
        ('PRM', 'Пермь'),
        ('NNV', 'Нижний Новгород'),
    )
    telephone_number = PhoneNumberField(null=True, blank=False, unique=True)
    age = models.IntegerField(null=False, blank=False)
    gender = models.BooleanField() # true for male, false for female
    city = models.CharField(choices=cities, max_length=255)
    images = models.ManyToManyField('ProfileImage')
    technologies = models.ManyToManyField('Technology')

    def match(self) -> 'CustomUser':
        '''
        Метод для поиска подходящего пользователя на основе рейтинга.

        Returns:
            CustomUser: Наиболее подходящий пользователь.
        '''
        matched_rankings = CustomUser.objects.all()
        if matched_rankings:
            return matched_rankings[0].user2
        return None

class ProfileImage(models.Model):
    file = models.FileField()

class Technology(models.Model):
    name = models.CharField(max_length=25)
    background_color = models.CharField(max_length=7)  # assuming hex color code, e.g., '#FFFFFF'
    text_color = models.CharField(max_length=7)

class CustomUserGrades(models.Model):
    user_from = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='user_who_graded')
    user_to = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='graded_user')
    grade = models.BooleanField() # true for like, false for dislike