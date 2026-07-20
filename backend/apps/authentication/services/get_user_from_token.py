from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken

User = get_user_model()


@database_sync_to_async
def get_user_from_token(token_string):
    try:
        access_token = AccessToken(token_string)
        return User.objects.get(id=access_token["user_id"])
    except Exception as e:
        import logging
        logging.getLogger(__name__).warning(f"JWT Validation inner error: {e}")
        return AnonymousUser()
