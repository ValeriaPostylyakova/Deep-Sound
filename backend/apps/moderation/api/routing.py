from django.urls import re_path

from apps.moderation.api import consumers

websocket_urlpatterns = [
    re_path(r"^ws/moderation-dashboard/$", consumers.ModeratorConsumer.as_asgi()),
]
