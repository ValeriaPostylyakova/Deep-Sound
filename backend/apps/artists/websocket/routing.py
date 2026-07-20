from django.urls import re_path

from apps.artists.websocket import consumers

websocket_urlpatterns = [
    re_path(r"^ws/dashboard-check-artist-content-status/$", consumers.ArtistContentConsumer.as_asgi()),
]
