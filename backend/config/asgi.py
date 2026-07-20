import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

from django.core.asgi import get_asgi_application

django_asgi_app = get_asgi_application()

from channels.routing import ProtocolTypeRouter, URLRouter

from core.middleware.jwt import JWTAuthMiddleware

from apps.moderation.api.routing import websocket_urlpatterns as moderation_websocket_urlpatterns
from apps.artists.websocket.routing import websocket_urlpatterns as music_websocket_urlpatterns

combined_websocket_urlpatterns = moderation_websocket_urlpatterns + music_websocket_urlpatterns

application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,
        "websocket": JWTAuthMiddleware(URLRouter(combined_websocket_urlpatterns)),
    }
)
