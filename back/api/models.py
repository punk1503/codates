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

    def match(self) -> 'CustomUser':
        '''
        Метод для поиска подходящего пользователя на основе рейтинга.

        Returns:
            CustomUser: Наиболее подходящий пользователь.
        '''
        matched_rankings = CustomUserRankings.objects.order_by('-rank')
        if matched_rankings:
            return matched_rankings[0].user2
        return None

class CustomUserToImage(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    image = models.ImageField(null=True, blank= True)

class Technology(models.Model):
    name = models.CharField(max_length=25)
    background_color = models.CharField(max_length=7)  # assuming hex color code, e.g., '#FFFFFF'
    text_color = models.CharField(max_length=7)

class CustomUserToTechnology(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    technology = models.ForeignKey(Technology, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'technology')

class CustomUserRankings(models.Model):
    user1 = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='first_user')
    user2 = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='second_user')
    rank = models.IntegerField(default=0)

    class Meta:
        constraints = [
            CheckConstraint(check=~Q(user1=F('user2')), name='different_users'),
            models.UniqueConstraint(fields=['user1', 'user2'], name='unique_users_pair'),
        ]

    @staticmethod
    def get_rank(user1: CustomUser, user2: CustomUser) -> int:
        '''
        Метод для вычисления рейтинга совпадения между двумя пользователями.

        Args:
            user1 (CustomUser): Первый пользователь.
            user2 (CustomUser): Второй пользователь.

        Returns:
            int: Рейтинг совпадения.
        '''
        rank = 0
        # Оценка на основе совпадения города
        if user1.city == user2.city:
            rank += 3
        # Оценка на основе общих технологий
        common_technologies = set(user1.customusertotechnology_set.values_list('technology__id', flat=True)) & set(user2.customusertotechnology_set.values_list('technology__id', flat=True))
        rank += len(common_technologies)
        # Оценка на основе возраста
        age_difference_percentage = min(abs(user1.age - user2.age) / max(user1.age, user2.age) * 100, 100)  # Разница в возрасте в процентах
        if age_difference_percentage <= 10:
            rank += 2
        elif age_difference_percentage <= 20:
            rank += 1
        # Оценка на основе пола 
        if user1.gender != user2.gender:
            rank += 1
        return rank
    
    @staticmethod
    def rank_user(user: CustomUser) -> None:
        '''
        Метод для ранжирования пользователей.

        Args:
            user (CustomUser): Пользователь, для которого производится ранжирование.

        Returns:
            None
        '''
        # Создаем список рейтингов для всех пользователей, исключая текущего пользователя
        ranking = [CustomUserRankings.objects.get_or_create(user1=user, user2=user2) for user2 in CustomUser.objects.exclude(id=user.id)]
        
        # Рассчитываем рейтинг для каждой пары пользователей
        for i in range(len(ranking)):
            ranking[i].rank = CustomUserRankings.get_rank(user1=user, user2=ranking[i].user2)
            ranking[i].save()

    @staticmethod
    def rank_users() -> None:
        '''
        Метод для ранжирования всех пользователей в системе.

        Returns:
            None
        '''
        # Ранжируем каждого пользователя в системе
        for user in CustomUser.objects.all():
            CustomUserRankings.rank_user(user)

class CustomUserGrades(models.Model):
    user_from = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='user_who_graded')
    user_to = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='graded_user')
    grade = models.BooleanField() # true for like, false for dislike