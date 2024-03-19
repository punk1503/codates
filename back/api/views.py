from rest_framework import permissions, generics, status, views
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import *
from .serializers import *
from django.contrib.auth import get_user_model, authenticate, login, logout
from django.middleware.csrf import get_token
import datetime


class CustomUserCreateAPIView(generics.CreateAPIView):
    '''
    API ендпоинт для регистрации пользователей.
    '''
    queryset = get_user_model().objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.AllowAny]

class CustomUserGradesCreateApiView(generics.CreateAPIView):
    '''
    API ендпоинт для отправки лайков и дизлайков.
    '''
    queryset = CustomUserGrades
    serializer_class = CustomUserGradesSerializer
    permission_classes = [permissions.IsAuthenticated]

@permission_classes([permissions.IsAuthenticated])
@api_view(['GET'])
def get_matched_user(request):
    '''
    API ендпоинт для получения наиболее подходяшего пользователя (мэтч).
    '''
    if request.user.is_authenticated:
        pair = CustomUserSerializer(request.user.match()).data
        return Response(pair)
    return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def get_csrf_token(request):
    '''
    API ендпоинт для получения csrf токена.
    '''
    csrf_token = get_token(request)
    return Response({'csrf_token': csrf_token})

def whoami(request):
    '''
    API ендпоинт для получения данных о текущем пользователе.
    '''
    return request.user

class CityListAPIView(generics.ListCreateAPIView):
    '''
    API ендпоинт для получения и создания городов.
    '''
    queryset = City.objects.all()
    serializer_class = CitySerializer
    permission_classes = [permissions.AllowAny]

class TechnologyListAPIView(generics.ListCreateAPIView):
    '''
    API ендпоинт для получения и создания технологий.
    '''
    queryset = Technology.objects.all()
    serializer_class = TechnologySerializer
    permission_classes = [permissions.AllowAny]

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def check_auth(request):
    if request.user.is_authenticated:
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_401_UNAUTHORIZED)

class CustomLoginView(views.APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # Устанавливаем идентификатор сессии в куки
            response = Response({'message': 'Вход успешен'})
            response.set_cookie(key='sessionid', httponly=False, value=request.session.session_key, samesite='None', expires=datetime.datetime.now() + datetime.timedelta(days=7), secure=True)
            return response
        else:
            return Response({'password': ['Неподходящая пара логин-пароль.']}, status=401)

@permission_classes([permissions.AllowAny])
@api_view(['GET'])
def logout_view(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def like_view(request):
    if request.data.get('to_user_id'):
        grade = CustomUserGrades(user_from=request.user, user_to=CustomUser.objects.get(id=request.data['to_user_id']), grade=True)
        grade.save()
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def dislike_view(request):
    if request.data.get('to_user_id'):
        grade = CustomUserGrades(user_from=request.user, user_to=CustomUser.objects.get(id=request.data['to_user_id']), grade=False)
        grade.save()
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_404_NOT_FOUND)

class ChatsListAPIView(generics.ListAPIView):
    def get_queryset(self):
        return Chat.objects.filter(Q(user1=self.request.user) | Q(user2=self.request.user))
    
    serializer_class = ChatSerializer
    permission_classes = [permissions.IsAuthenticated]
