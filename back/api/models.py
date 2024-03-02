from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.db.models import Q
from sklearn.cluster import KMeans
import numpy as np

class CustomUser(AbstractUser):
    cities = [
    ('1', 'Москва'),
    ('2', 'Санкт-Петербург'),
    ('3', 'Новосибирск'),
    ('4', 'Екатеринбург'),
    ('5', 'Нижний Новгород'),
    ('6', 'Казань'),
    ('7', 'Челябинск'),
    ('8', 'Омск'),
    ('9', 'Самара'),
    ('10', 'Ростов-на-Дону'),
    ('11', 'Уфа'),
    ('12', 'Красноярск'),
    ('13', 'Воронеж'),
    ('14', 'Пермь'),
    ('15', 'Волгоград'),
    ('16', 'Краснодар'),
    ('17', 'Саратов'),
    ('18', 'Тюмень'),
    ('19', 'Тольятти'),
    ('20', 'Ижевск'),
    ('21', 'Барнаул'),
    ('22', 'Ульяновск'),
    ('23', 'Иркутск'),
    ('24', 'Хабаровск'),
    ('25', 'Ярославль'),
    ('26', 'Владивосток'),
    ('27', 'Махачкала'),
    ('28', 'Томск'),
    ('29', 'Оренбург'),
    ('30', 'Кемерово'),
    ('31', 'Новокузнецк'),
    ('32', 'Рязань'),
    ('33', 'Астрахань'),
    ('34', 'Пенза'),
    ('35', 'Липецк'),
    ('36', 'Тула'),
    ('37', 'Киров'),
    ('38', 'Чебоксары'),
    ('39', 'Калининград'),
    ('40', 'Балашиха'),
    ('41', 'Курск'),
    ('42', 'Севастополь'),
    ('43', 'Волжский'),
    ('44', 'Сочи'),
    ('45', 'Железнодорожный'),
    ('46', 'Владимир'),
    ('47', 'Нижний Тагил'),
    ('48', 'Химки'),
    ('49', 'Ставрополь'),
    ('50', 'Якутск'),
    ('51', 'Таганрог'),
    ('52', 'Кострома'),
    ('53', 'Королев'),
    ('54', 'Новороссийск'),
    ('55', 'Улан-Удэ'),
    ('56', 'Нальчик'),
    ('57', 'Шахты'),
    ('58', 'Дзержинск'),
    ('59', 'Орёл'),
    ('60', 'Братск'),
    ('61', 'Курган'),
    ('62', 'Рыбинск'),
    ('63', 'Архангельск'),
    ('64', 'Ангарск'),
    ('65', 'Сыктывкар'),
    ('66', 'Благовещенск'),
    ('67', 'Петрозаводск'),
    ('68', 'Рубцовск'),
    ('69', 'Северодвинск'),
    ('70', 'Абакан'),
    ('71', 'Новочеркасск'),
    ('72', 'Псков'),
    ('73', 'Брянск'),
    ('74', 'Люберцы'),
    ('75', 'Коркино'),
    ('76', 'Мытищи'),
    ('77', 'Хасавюрт'),
    ('78', 'Каменск-Уральский'),
    ('79', 'Миасс'),
    ('80', 'Нижнекамск'),
    ('81', 'Ленинск-Кузнецкий'),
    ('82', 'Салават'),
    ('83', 'Долгопрудный'),
    ('84', 'Раменское'),
    ('85', 'Черкесск'),
    ('86', 'Серпухов'),
    ('87', 'Подольск'),
    ('88', 'Щёлково'),
    ('89', 'Жуковский'),
    ('90', 'Элиста'),
    ('91', 'Волгодонск'),
    ('92', 'Камышин'),
    ('93', 'Мурманск'),
    ('94', 'Петропавловск-Камчатский'),
    ('95', 'Новочебоксарск'),
    ('96', 'Кызыл'),
    ('97', 'Нефтеюганск'),
    ('98', 'Сергиев Посад'),
    ('99', 'Назрань'),
    ('100', 'Каспийск')
]

    telephone_number = PhoneNumberField(null=True, blank=False, unique=True)
    age = models.IntegerField(null=False, blank=False)
    gender = models.BooleanField() # true for male, false for female
    city = models.CharField(choices=cities, max_length=255)
    images = models.ManyToManyField('ProfileImage')
    technologies = models.ManyToManyField('Technology')
    cluster = models.IntegerField(null=True, blank=True)
    
    def create(cls, **kwargs):
        new_user = cls(**kwargs)
        new_user_features = np.array([kwargs.get('age'), kwargs.get('gender'), kwargs.get('city')] + [technology.name for technology in kwargs.get('technologies')])
        X_new = new_user_features.reshape(1, -1)
        kmeans = KMeans(n_clusters=4)
        kmeans.fit(X_new)
        new_user.cluster = kmeans.predict(X_new)[0]
        print(new_user.cluster)
        new_user.save()
        return new_user

    def match(self) -> 'CustomUser':
        '''
        Метод для поиска подходящего пользователя на основе рейтинга.

        Returns:
            CustomUser: Наиболее подходящий пользователь.
        '''
        negative_users_pool = CustomUserGrades.objects.filter(user_from=self)
        matched_users = [user for user in CustomUser.objects.filter(cluster=self.cluster) if user not in negative_users_pool]
        if matched_users:
            return matched_users[0]
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