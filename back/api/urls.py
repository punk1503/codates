from django.urls import path, include
from .views import *


urlpatterns = [
    path('signup/', CustomUserCreateAPIView.as_view(), name='signup'),
    path('drf-auth/', include('rest_framework.urls'))
]