from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from apps.authentication.api.serializers.read import LoginReadSerializer


def generate_tokens(user, message):
    refresh = RefreshToken.for_user(user)

    response = Response({
        "access": str(refresh.access_token),
        "user": LoginReadSerializer(user).data,
        "message": message
    }, status=status.HTTP_200_OK)

    simple_jwt_settings = getattr(settings, "SIMPLE_JWT", {})
    refresh_lifetime = simple_jwt_settings.get("REFRESH_TOKEN_LIFETIME")

    response.set_cookie(
        key='refresh_token',
        value=str(refresh),
        expires=refresh_lifetime,
        httponly=True,
        secure=True,
        samesite='Lax',
        path="/api/token/refresh/"
    )

    return response
