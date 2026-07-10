from django.urls import re_path

from .tracks import consumers

websocket_urlpatterns = [
    re_path(r"^ws/dashboard/$", consumers.MusicConsumer.as_asgi()),
]
