from django.urls import path
from rest_framework.routers import DefaultRouter

from .views.favorites import FavoriteTrackViewSet, FavoriteAlbumViewSet, FavoriteArtistViewSet
from .views.playlists import UserPlaylistViewSet
from ..api import views

router = DefaultRouter()

router.register(r"user-playlists", UserPlaylistViewSet, basename="user-playlists")
router.register(r"favorite-tracks", FavoriteTrackViewSet, basename="favorite-tracks")
router.register(r"favorite-albums", FavoriteAlbumViewSet, basename="favorite-albums")
router.register(r"favorite-artists", FavoriteArtistViewSet, basename="favorite-artists")

urlpatterns = [
    path("me/", views.UserProfileView.as_view(), name="me"),

]

urlpatterns += router.urls
