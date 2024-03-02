from typing import Any
from django.core.management import BaseCommand
from api.models import CustomUser
from sklearn.cluster import KMeans
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
import pandas as pd

class Command(BaseCommand):
    def handle(self, *args: Any, **options: Any) -> str | None:
        users = CustomUser.objects.all()

        # Создаем DataFrame на основе данных о пользователях
        user_data = [[user.city, user.age] for user in users]
        df = pd.DataFrame(user_data, columns=['city', 'age'])

        # Определяем категориальные и числовые признаки
        categorical_features = ['city']
        numerical_features = ['age']

        # Создаем пайплайн для обработки данных
        # Здесь используется OneHotEncoder для категориальных признаков
        # И SimpleImputer для числовых признаков, чтобы заполнить пропущенные значения
        preprocessor = ColumnTransformer(
            transformers=[
                ('cat', OneHotEncoder(), categorical_features),
                ('num', SimpleImputer(strategy='median'), numerical_features)
            ])

        # Преобразуем данные о пользователях в матрицу признаков
        X = preprocessor.fit_transform(df)

        # Определяем количество кластеров (может потребоваться оптимизация этого параметра)
        n_clusters = 4

        # Инициализируем и обучаем модель кластеризации
        kmeans = KMeans(n_clusters=n_clusters)
        kmeans.fit(X)

        # Получаем метки кластеров для каждого пользователя
        cluster_labels = kmeans.labels_

        # Выводим результаты кластеризации
        for user, label in zip(users, cluster_labels):
            user.cluster = label
            user.save()
            print(f"User {user.id} belongs to cluster {label}")
