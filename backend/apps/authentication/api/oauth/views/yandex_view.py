from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from apps.authentication.api.oauth.serializers import YandexAuthSerializer
from apps.authentication.api.oauth.services.yndex_auth import exchange_code_for_token, get_user_info
from apps.authentication.models import SocialAccount, Role

User = get_user_model()


class YandexAuthView(APIView):
    permission_classes = [AllowAny]

    @transaction.atomic
    def post(self, request):
        serializer = YandexAuthSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        code = serializer.validated_data["code"]

        try:
            access_token = exchange_code_for_token(code)

            yandex_data = get_user_info(access_token)

        except Exception:
            return Response(
                {"message": "Ошибка авторизации через Яндекс"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        provider_id = yandex_data["id"]
        email = yandex_data["default_email"]

        social = SocialAccount.objects.select_related("user").filter(
            provider="yandex",
            provider_id=provider_id,
        ).first()

        if social:
            user = social.user

        else:
            user = User.objects.filter(email=email).first()

            if not user:
                user = User.objects.create_user(
                    email=email,
                    username=email,
                )

                user.set_unusable_password()
                user.save()

                user.role.add(Role.objects.get_or_create(name="user"))

            SocialAccount.objects.create(
                user=user,
                provider="yandex",
                provider_id=provider_id,
            )

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "message": "Авторизация через Яндекс успешна",
            }
        )
