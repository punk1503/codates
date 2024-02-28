from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField


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

class CustomUserToImage(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    image = models.ImageField(null=True, blank= True)
