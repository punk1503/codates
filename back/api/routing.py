from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<user_id_1>\w+)_(?P<user_id_2>\w+)/$', consumers.ChatConsumer.as_asgi()),
]
