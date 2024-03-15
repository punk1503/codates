from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.db.models import Q
from rest_framework.response import Response
from rest_framework import status

class CustomUser(AbstractUser):
    THEMES = {
        ('a11y-dark', 'A11y Dark'),
        ('a11y-light', 'A11y Light'),
        ('agate', 'Agate'),
        ('an-old-hope', 'An Old Hope'),
        ('androidstudio', 'Android Studio'),
        ('arduino-light', 'Arduino Light'),
        ('arta', 'Arta'),
        ('ascetic', 'Ascetic'),
        ('atom-one-dark-reasonable', 'Atom One Dark Reasonable'),
        ('atom-one-dark', 'Atom One Dark'),
        ('atom-one-light', 'Atom One Light'),
        ('brown-paper', 'Brown Paper'),
        ('codepen-embed', 'Codepen Embed'),
        ('color-brewer', 'Color Brewer'),
        ('dark', 'Dark'),
        ('default', 'Default'),
        ('devibeans', 'Devibeans'),
        ('docco', 'Docco'),
        ('far', 'Far'),
        ('felipec', 'Felipec'),
        ('foundation', 'Foundation'),
        ('github-dark-dimmed', 'Github Dark Dimmed'),
        ('github-dark', 'Github Dark'),
        ('github', 'Github'),
        ('gml', 'GML'),
        ('googlecode', 'Google Code'),
        ('gradient-dark', 'Gradient Dark'),
        ('gradient-light', 'Gradient Light'),
        ('grayscale', 'Grayscale'),
        ('hybrid', 'Hybrid'),
        ('idea', 'Idea'),
        ('intellij-light', 'Intellij Light'),
        ('ir-black', 'IR Black'),
        ('isbl-editor-dark', 'ISBL Editor Dark'),
        ('isbl-editor-light', 'ISBL Editor Light'),
        ('kimbie-dark', 'Kimbie Dark'),
        ('kimbie-light', 'Kimbie Light'),
        ('lightfair', 'Lightfair'),
        ('lioshi', 'Lioshi'),
        ('magula', 'Magula'),
        ('mono-blue', 'Mono Blue'),
        ('monokai-sublime', 'Monokai Sublime'),
        ('monokai', 'Monokai'),
        ('night-owl', 'Night Owl'),
        ('nnfx-dark', 'NNFX Dark'),
        ('nnfx-light', 'NNFX Light'),
        ('nord', 'Nord'),
        ('obsidian', 'Obsidian'),
        ('panda-syntax-dark', 'Panda Syntax Dark'),
        ('panda-syntax-light', 'Panda Syntax Light'),
        ('paraiso-dark', 'Paraiso Dark'),
        ('paraiso-light', 'Paraiso Light'),
        ('pojoaque', 'Pojoaque'),
        ('purebasic', 'Purebasic'),
        ('qtcreator-dark', 'Qtcreator Dark'),
        ('qtcreator-light', 'Qtcreator Light'),
        ('rainbow', 'Rainbow'),
        ('routeros', 'Routeros'),
        ('school-book', 'School Book'),
        ('shades-of-purple', 'Shades Of Purple'),
        ('srcery', 'Srcery'),
        ('stackoverflow-dark', 'Stackoverflow Dark'),
        ('stackoverflow-light', 'Stackoverflow Light'),
        ('sunburst', 'Sunburst'),
        ('tokyo-night-dark', 'Tokyo Night Dark'),
        ('tokyo-night-light', 'Tokyo Night Light'),
        ('tomorrow-night-blue', 'Tomorrow Night Blue'),
        ('tomorrow-night-bright', 'Tomorrow Night Bright'),
        ('vs', 'VS'),
        ('vs2015', 'VS 2015'),
        ('xcode', 'Xcode'),
        ('xt256', 'XT256')
    }

    telephone_number = PhoneNumberField(null=True, blank=False, unique=True)
    age = models.IntegerField(null=False, blank=False)
    gender = models.BooleanField() # true for male, false for female
    city = models.ForeignKey('City', on_delete=models.SET_NULL, null=True)
    technologies = models.ManyToManyField('Technology')
    code_snippet = models.TextField(default='print("I love CoDates!")')
    code_theme = models.CharField(choices=THEMES, max_length=255)
    description = models.CharField(max_length=255)
    cluster = models.FloatField()

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