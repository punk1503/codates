from typing import Any
from django.core.management import BaseCommand
import json
from api.models import CustomUser


class Command(BaseCommand):
    def handle(self, *args: Any, **options: Any) -> str | None:
        def generate_user_data(number: int) -> None:
            from faker import Faker
            from random import randint
            import json

            fake = Faker(['ru_RU'])

            cities = [
                ('MSC', 'Москва'),
                ('SPB', 'Санкт-Петербург'),
                ('PRM', 'Пермь'),
                ('NNV', 'Нижний Новгород'),
            ]

            users = []

            for _ in range(number):
                username = fake.user_name()
                telephone_number = fake.phone_number()
                age = randint(18, 90)
                gender = bool(randint(0, 1))  # Randomly select gender
                city = fake.random_element(cities)[0]  # Randomly select city code

                user = {
                    'telephone_number': telephone_number,
                    'age': age,
                    'gender': gender,
                    'city': city,
                    'username': username,
                }
                users.append(user)

            # Writing the users data to a JSON file
            with open('users.json', 'w') as file:
                json.dump(users, file, indent=4)

            print("Data written to users.json successfully.")

        generate_user_data(1000)
        with open('users.json', 'r') as file:
            users = json.load(file)
            for user_data in users:
                try:
                    CustomUser.objects.create(
                        telephone_number=user_data['telephone_number'],
                        age=user_data['age'],
                        gender=user_data['gender'],
                        city=user_data['city'],
                        username=user_data['username']
                    ).save()

                    print(f"User created with telephone number: {user_data['telephone_number']}")
                except Exception as e:
                    print(f"Error creating user {e}")