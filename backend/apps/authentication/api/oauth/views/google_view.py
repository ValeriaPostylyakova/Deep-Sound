from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from apps.authentication.api.oauth.serializers import GoogleAuthSerializer
from apps.authentication.api.oauth.services.google_auth import verify_google_token
from apps.authentication.models import SocialAccount, Role

User = get_user_model()


class GoogleAuthView(APIView):
    permission_classes = [AllowAny]

    @transaction.atomic
    def post(self, request):
        serializer = GoogleAuthSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        token = serializer.validated_data["token"]

        try:
            google_data = verify_google_token(token)
        except Exception:
            return Response(
                {"message": "Невалидный Google токен"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        provider_id = google_data["sub"]
        email = google_data["email"]

        social_account = SocialAccount.objects.select_related("user").filter(
            provider="google",
            provider_id=provider_id,
        ).first()

        if social_account:
            user = social_account.user

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
                provider="google",
                provider_id=provider_id,
            )

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "message": "Авторизация через Google прошла успешно",
            },
            status=status.HTTP_200_OK,
        )
