from typing import Any
from django.core.management import BaseCommand
from django.contrib.auth import get_user_model
from django.db import transaction
from api.models import Technology, CustomUser
from faker import Faker
import random
import json

class Command(BaseCommand):
    def handle(self, *args: Any, **options: Any) -> str | None:
        # Создаем экземпляр Faker для генерации случайных данных
        fake = Faker()

        # Получаем модель CustomUser
        User = get_user_model()

        # Функция для получения случайной технологии из базы данных
        def get_random_technologies():
            # Получаем все технологии из базы данных
            all_technologies = Technology.objects.all()
            # Выбираем случайное количество технологий
            return random.sample(list(all_technologies), k=random.randint(1, 3))

        # Генерируем пользователей
        @transaction.atomic
        def generate_users(num_users):
            users = []
            for _ in range(num_users):
                user_data = {
                    "username": fake.unique.user_name(),
                    "telephone_number": fake.phone_number(),
                    "age": random.randint(18, 65),
                    "gender": random.choice([True, False]),
                    "city": random.choice(CustomUser.cities),
                    "technologies": [tech for tech in get_random_technologies()]
                }
                users.append(user_data)
            
            for user in users:
                tech = user.pop('technologies')
                user = CustomUser.objects.create(**user)
                [user.technologies.add(t) for t in tech]
                user.save()
            return users

        # Генерируем пользователей
        users_data = generate_users(1000)

        # Сохраняем пользователей в файл JSON
        with open('users.json', 'w') as f:
            json.dump(users_data, f, indent=4)
        self.stdout.write(self.style.SUCCESS('Users successfully loaded into the database.'))

