from django.urls import path, include
from .views import *


urlpatterns = [
    path('signup/', CustomUserCreateAPIView.as_view(), name='signup'),
    path('drf-auth/', include('rest_framework.urls')),
    path('get-csrf-token/', get_csrf_token, name='get_csrf_token'),
    path('grades/', CustomUserGradesCreateApiView.as_view(), name='grades'),
    path('match/', get_matched_user, name='match')
]