from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from ..api import views

urlpatterns = [
    path("me/", views.UserProfileView.as_view(), name="me"),
]
