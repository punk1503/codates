from django.core.management.base import BaseCommand
from api.models import CustomUser, Technology, ProfilePicture
from faker import Faker
import random

class Command(BaseCommand):
    help = 'Generate a specified number of users with existing technologies'

    def add_arguments(self, parser):
        parser.add_argument('number_of_users', type=int, help='Number of users to generate')

    def handle(self, *args, **options):
        number = options['number_of_users']
        fake = Faker('ru_RU')

        # Retrieve existing technologies from the database
        technologies = list(Technology.objects.all())
        images = [
            '1.jpg',
            '2.jpg',
            '3.jpg',
            '4.jpg',
            '5.jpg',
        ]

        for _ in range(number):
            # Generate user data
            first_name = fake.first_name()
            last_name = fake.last_name()
            email = fake.email()
            telephone_number = fake.phone_number()
            age = fake.random_int(min=18, max=80)
            gender = fake.boolean(chance_of_getting_true=50)
            city_id = fake.random_int(min=1, max=10)  # Assuming you have 10 cities in your database
            description = fake.sentence().strip("('").rstrip("')")
            first_elements = [theme[0] for theme in CustomUser.THEMES]
            code_theme = first_elements[random.randint(0, len(first_elements)-1)]
            try:
                user = CustomUser.objects.create(
                    username=fake.user_name(),
                    email=email,
                    first_name=first_name,
                    last_name=last_name,
                    telephone_number=telephone_number,
                    age=age,
                    gender=gender,
                    city_id=city_id,
                    code_theme=code_theme,
                    description=description,
                )


                for _ in range(random.randint(1, 5)):
                    technology = random.choice(technologies)
                    user.technologies.add(technology)
                
                for _ in range(random.randint(1, 5)):
                    profile_picture = ProfilePicture(user=user, image=random.choice(images))
                    profile_picture.save()
            except:
                number -= 1

        self.stdout.write(self.style.SUCCESS(f'Successfully created {number} user' + ('s' if number > 1 else '') + ' with existing technologies.'))
