from api.models import CustomUser
import json

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
        telephone_number = fake.phone_number()
        age = randint(18, 90)
        gender = bool(randint(0, 1))  # Randomly select gender
        city = fake.random_element(cities)[0]  # Randomly select city code

        user = {
            'telephone_number': telephone_number,
            'age': age,
            'gender': gender,
            'city': city
        }
        users.append(user)

    # Writing the users data to a JSON file
    with open('users.json', 'w') as file:
        json.dump(users, file, indent=4)

    print("Data written to users.json successfully.")


def fill_users():
    with open('users.json', 'r') as file:
        users = json.load(file)
        for user_data in users:
            try:
                CustomUser.objects.create(
                    telephone_number=user_data['telephone_number'],
                    age=user_data['age'],
                    gender=user_data['gender'],
                    city=user_data['city']
                )
                print(f"User created with telephone number: {user_data['telephone_number']}")
            except:
                print(f"Error creating user")


if __name__ == '__main__':
    fill_users()