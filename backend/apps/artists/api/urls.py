from django.urls import path
from rest_framework.routers import DefaultRouter

from apps.artists.api.views import ArtistProfileReadOnlyViewSet, ArtistProfileView

router = DefaultRouter()

router.register(r"", ArtistProfileReadOnlyViewSet, basename='artist-profiles')

urlpatterns = [
    path("me/", ArtistProfileView.as_view(), name="me")
]

urlpatterns += router.urls
