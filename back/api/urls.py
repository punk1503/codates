from django.urls import path, include
from .views import *


urlpatterns = [
    path('signup/', CustomUserCreateAPIView.as_view()),
    path('signin/', CustomLoginView.as_view()),
    path('logout/', logout_view),
    path('drf-auth/', include('rest_framework.urls')),
    path('get-csrf-token/', get_csrf_token),
    path('grades/', CustomUserGradesCreateApiView.as_view()),
    path('match/', get_matched_user),
    path('whoami/', whoami),
    path('cities/', CityListAPIView.as_view()),
    path('technologies/', TechnologyListAPIView.as_view()),
    path('check-auth/', check_auth),
    path('like/', like_view),
    path('dislike/', dislike_view),
    path('chats/', ChatsListAPIView.as_view()),
    path('chat/<int:user_id>/', MessagesListAPIView.as_view()),
    path('user-edit/', CustomUserUpdateAPIView.as_view()),
    path('themes/', get_themes),
    path('profile-picture-upload/', ProfilePictureCreateAPIView.as_view()),
    path('chat-destroy/<int:pk>/', ChatDeleteAPIView.as_view()),
]
