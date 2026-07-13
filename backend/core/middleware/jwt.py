import logging
from urllib.parse import parse_qs

from django.contrib.auth.models import AnonymousUser

from apps.authentication.api.services.get_user_from_token import get_user_from_token

logger = logging.getLogger(__name__)


class JWTAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        query_string = scope.get("query_string", b"").decode("utf-8")
        query_params = parse_qs(query_string)

        token_list = query_params.get("token", [None])
        token = token_list[0] if token_list else None

        if token:
            if token.startswith("Bearer "):
                token = token.replace("Bearer ", "").strip()

            try:
                user = await get_user_from_token(token)

                if user and user.is_authenticated:
                    scope["user"] = user
                    logger.info(f"WebSocket authenticated for user: {user.id}")
                else:
                    scope["user"] = AnonymousUser()
            except Exception as exc:
                logger.exception("Critical error in JWT Middleware")
                scope["user"] = AnonymousUser()
        else:
            scope["user"] = AnonymousUser()

        return await self.inner(scope, receive, send)
