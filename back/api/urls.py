from django.urls import path
from .views import *


urlpatterns = [
    path('signup/', CustomUserCreateAPIView.as_view(), name='signup')
]