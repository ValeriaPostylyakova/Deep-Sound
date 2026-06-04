from django.urls import re_path

from .tracks import consumers

websocket_urlpatterns = [
    re_path(r"^ws/dashboard/$", consumers.TrackConsumer.as_asgi()),
    re_path(r"^ws/moderation-dashboard/$", consumers.ModeratorConsumer.as_asgi()),
]
