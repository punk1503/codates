from rest_framework import permissions, generics, status, views, parsers
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import *
from .serializers import *
from django.contrib.auth import get_user_model, authenticate, login, logout
from django.middleware.csrf import get_token
from django.db.models import Q


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

@api_view(['GET'])
def whoami(request):
    '''
    API ендпоинт для получения данных о текущем пользователе.
    '''
    return Response(CustomUserSerializer(request.user).data)

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
        # Extract username/email and password from request data
        username_or_email = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username_or_email, password=password)

        if user is not None:
            login(request, user)
            response = Response({'sessionid': request.session.session_key})
            return response
        else:
            return Response({'detail': 'Неподходящая пара логин-пароль.'}, status=401)


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

class MessagesListAPIView(generics.ListAPIView):
    def get_queryset(self):
        return Message.objects.filter(chat=Chat.objects.get(Q(user1=self.request.user, user2=self.kwargs.get('user_id')) | Q(user1=self.kwargs.get('user_id'), user2=self.request.user)))
    
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

class CustomUserUpdateAPIView(generics.UpdateAPIView):
    def get_object(self):
        return self.request.user
    
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

@permission_classes([permissions.IsAuthenticated])
@api_view(['GET'])
def get_themes(request):
    return Response([{'value': theme[0], 'label' : theme[1]} for theme in CustomUser.THEMES])

class ProfilePictureCreateAPIView(generics.CreateAPIView):
    serializer_class = ProfilePictureSerializer
    queryset = ProfilePicture.objects.all()
    parser_classes = [parsers.FormParser, parsers.MultiPartParser]

    def post(self, request, *args, **kwargs):
        if request.data.get('image'):
            ProfilePicture.objects.filter(user=request.user.id).delete()
        serializer = self.serializer_class(data={'user': request.user.id, 'image': request.data['image']})
        if serializer.is_valid():
            # you can access the file like this from serializer
            # uploaded_file = serializer.validated_data["file"]
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
        
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class ChatDeleteAPIView(generics.DestroyAPIView):
    serializer_class = ChatSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = CustomUser.objects.get(id=self.kwargs['pk'])
        return Chat.objects.get(Q(user1=self.request.user, user2=user) | Q(user1=user, user2=self.request.user))

    def delete(self, request, *args, **kwargs):
        chat = self.get_queryset()
        chat.delete()
        return Response(status=status.HTTP_200_OK)
