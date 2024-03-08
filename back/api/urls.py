from django.urls import path, include
from .views import *


urlpatterns = [
    path('signup/', CustomUserCreateAPIView.as_view()),
    path('drf-auth/', include('rest_framework.urls')),
    path('get-csrf-token/', get_csrf_token),
    path('grades/', CustomUserGradesCreateApiView.as_view()),
    path('match/', get_matched_user),
    path('whoami/', whoami),
    path('cities/', CityListAPIView.as_view()),
    path('technologies/', TechnologyListAPIView.as_view()),
]