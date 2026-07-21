from django.urls import path
from rest_framework.routers import DefaultRouter

from .views.favorites import FavoriteTrackViewSet, FavoriteAlbumViewSet, FavoriteArtistViewSet
from .views.playlists import ListenerPlaylistViewSet
from .views.profiles import ListenerProfileView

router = DefaultRouter()
router.register(r"listener-playlists", ListenerPlaylistViewSet, basename="listener-playlists")
router.register(r"favorite-tracks", FavoriteTrackViewSet, basename="favorite-tracks")
router.register(r"favorite-albums", FavoriteAlbumViewSet, basename="favorite-albums")
router.register(r"favorite-artists", FavoriteArtistViewSet, basename="favorite-artists")

urlpatterns = [
    path("me/", ListenerProfileView.as_view(), name="me"),
]
