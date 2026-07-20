from django.urls import path

from apps.authentication.oauth import GoogleAuthView, YandexAuthView
from ..api import views

urlpatterns = [
    path("register/", views.RegisterView.as_view(), name="register"),
    path("login/", views.LoginView.as_view(), name="login"),
    path("logout/", views.logout, name="logout"),
    path("token/refresh/", views.CustomTokenRefreshView.as_view(), name="token_refresh"),
    path(
        "forgot-password/", views.ForgotPasswordView.as_view(), name="forgot-password"
    ),
    path("reset-password/", views.ResetPasswordView.as_view(), name="reset-password"),
    path(
        "change-password/", views.ChangePasswordView.as_view(), name="change-password"
    ),
    path("verify-email/", views.VerifyEmailView.as_view(), name="verify-email"),
    path("oauth/google/login/", GoogleAuthView.as_view(), name="google-auth"),
    path("oauth/yandex/login/", YandexAuthView.as_view(), name="yandex-auth")
]
