from django.contrib.auth import get_user_model, login
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from ..tasks.email import send_change_password, send_email_welcome
from .serializers.login import LoginSerializer
from .serializers.read import UserLoginReadSerializer, UserReadSerializer
from .serializers.register import RegisterSerializer
from .serializers.write import (
    ChangePasswordWriteSerializer,
    ForgotPasswordWriteSerializer,
    ResetPasswordWriteSerializer,
    UserWriteSerializer,
)
from .services.password_reset import forgot_password, reset_password
from .utils.utils import current_device_info

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        send_email_welcome.delay(user.email, user.username)

        return Response(
            {
                "user": RegisterSerializer(user).data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "message": "Регистрация прошла успешно",
            },
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    queryset = User.objects.all()
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        login(request, user)
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "user": UserLoginReadSerializer(user).data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "message": "Авторизация прошла успешно",
            },
            status=status.HTTP_200_OK,
        )


class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserReadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == "PATCH":
            return UserWriteSerializer
        return UserReadSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        response_serializer = UserReadSerializer(self.get_object())
        return Response(response_serializer.data, status=status.HTTP_200_OK)


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
    permission_classes = [permissions.AllowAny]
    serializer_class = ForgotPasswordWriteSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        forgot_password(serializer.validated_data["user"])

        return Response(
            {"message": "Письмо успешно отправлено на почту"}, status=status.HTTP_200_OK
        )


class ResetPasswordView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ResetPasswordWriteSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
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
                {"message": "Токен не действителен"}, status=status.HTTP_400_BAD_REQUEST
            )


class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ChangePasswordWriteSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save()

            current_device = current_device_info(request)

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
