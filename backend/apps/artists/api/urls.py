from django.urls import path
from rest_framework.routers import DefaultRouter

from apps.artists.api.views import ArtistProfileViewSet, become_artist

router = DefaultRouter()

router.register("", ArtistProfileViewSet)

urlpatterns = [
    path(
        "become-artist/",
        become_artist,
        name="become-artist",
    ),
]

urlpatterns += router.urls
