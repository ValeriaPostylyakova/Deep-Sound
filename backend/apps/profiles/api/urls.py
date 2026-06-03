from django.urls import path

from ..api import views

urlpatterns = [
    path("me/", views.UserProfileView.as_view(), name="me"),
]
