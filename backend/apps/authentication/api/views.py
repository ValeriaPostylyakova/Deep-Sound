from django.conf import settings
from django.contrib.auth import get_user_model, login
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView

from .serializers.read import LoginReadSerializer
from .serializers.write import (
    ChangePasswordWriteSerializer,
    ForgotPasswordWriteSerializer,
    LoginWriteSerializer,
    RegisterWriteSerializer,
    ResetPasswordWriteSerializer, VerifyEmailTokenSerializer,
)
from .services.password_reset import forgot_password, reset_password
from .services.verification_email import send_verification_link, verify_email_token
from .utils.get_device_info import get_device_info
from ..tasks.send_change_password import send_change_password

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterWriteSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        send_verification_link(user.email)

        return Response(
            {
                "message": "Регистрация прошла успешно. Пожалуйста, подтвердите свою почту.",
            },
            status=status.HTTP_201_CREATED,
        )


class LoginView(generics.GenericAPIView):
    serializer_class = LoginWriteSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]
        login(request, user)

        refresh = RefreshToken.for_user(user)
        response = Response(
            {
                "access": str(refresh.access_token),
                "user": LoginReadSerializer(user).data,
                "message": "Авторизация прошла успешно",
            },
            status=status.HTTP_200_OK,
        )

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


class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response(
                {"detail": "Refresh token не найден в куках"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        serializer = self.get_serializer(data={"refresh": refresh_token})

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def logout(request):
    try:
        refresh = request.data.get("refresh")
        if not refresh:
            return Response(
                {"message": "Вы не передали refresh токен в body"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        token = RefreshToken(refresh)
        token.blacklist()
        return Response(
            {"message": "Вы успешно вышли из системы"}, status=status.HTTP_200_OK
        )

    except Exception as e:
        return Response(
            {
                "message": "Ошибка сервера",
                "error_type": e.__class__.__name__,
                "error_details": str(e),
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class ForgotPasswordView(APIView):
    def post(self, request):
        serializer = ForgotPasswordWriteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        forgot_password(serializer.validated_data["user"])

        return Response(
            {"message": "Письмо успешно отправлено на почту"}, status=status.HTTP_200_OK
        )


class ResetPasswordView(APIView):
    def post(self, request):
        serializer = ResetPasswordWriteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        success = reset_password(
            serializer.validated_data["token"], serializer.validated_data["password"]
        )

        if success:
            return Response(
                {"message": "Пароль успешно изменен"}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {
                    "message": "Токен не действителен. Отправьте новый запрос на изменение пароля и попробуйте еще раз."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )


class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordWriteSerializer(
            data=request.data, context={"request": request}
        )

        if serializer.is_valid():
            serializer.save()

            current_device = get_device_info(request)

            send_change_password.delay(
                request.user.email,
                request.user.username,
                current_device["current_time"],
                current_device["ip_address"],
                current_device["device_info"],
            )

            return Response(
                {"message": "Пароль успешно изменен"}, status=status.HTTP_200_OK
            )

        return Response(
            {"message": "Токен не действителен"}, status=status.HTTP_400_BAD_REQUEST
        )


class VerifyEmailView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = VerifyEmailTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        verify_email_token(serializer.validated_data["token"])

        return Response(
            {"message": "Почта успешно подтверждена"},
            status=status.HTTP_200_OK
        )
