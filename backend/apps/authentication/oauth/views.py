from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.authentication.oauth.serializers import GoogleAuthSerializer, YandexAuthSerializer
from apps.authentication.oauth.services.google import verify_google_token
from apps.authentication.oauth.services.social_auth_service import SocialAuthService
from apps.authentication.oauth.services.yandex import exchange_code_for_token, get_user_info


class GoogleAuthView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = GoogleAuthSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            google_data = verify_google_token(serializer.validated_data["token"])
        except Exception:
            return Response(
                {"message": "Невалидный Google токен"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return SocialAuthService.authenticate_social_user(
            provider="google",
            provider_id=google_data["sub"],
            email=google_data["email"],
            requested_role=serializer.validated_data["role"]
        )


class YandexAuthView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = YandexAuthSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            access_token = exchange_code_for_token(serializer.validated_data["code"])
            yandex_data = get_user_info(access_token)
        except Exception:
            return Response(
                {"message": "Ошибка авторизации через Яндекс"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return SocialAuthService.authenticate_social_user(
            provider="yandex",
            provider_id=yandex_data["id"],
            email=yandex_data["default_email"],
            requested_role=serializer.validated_data["role"]
        )
