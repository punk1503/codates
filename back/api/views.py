from rest_framework import permissions, generics, status, views
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import *
from .serializers import *
from django.contrib.auth import get_user_model, authenticate, login, logout
from django.middleware.csrf import get_token

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

@api_view(['GET'])
def get_matched_user(request):
    '''
    API ендпоинт для получения наиболее подходяшего пользователя (мэтч).
    '''
    return Response(CustomUserSerializer(request.user.match()))

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
            response.set_cookie(key='sessionid', value=request.session.session_key)
            return response
        else:
            return Response({'errors': 'Неверная пара логин-пароль'}, status=401)

@permission_classes([permissions.AllowAny])
@api_view(['GET'])
def logout_view(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)