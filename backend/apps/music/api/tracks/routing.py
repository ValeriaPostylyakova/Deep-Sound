from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    # адрес: ws://localhost:8000/ws/track/ID/
    re_path(r"ws/track/(?P<track_id>\d+)/$", consumers.TrackConsumer.as_asgi()),
]
