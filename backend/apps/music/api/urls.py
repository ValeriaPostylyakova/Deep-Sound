from rest_framework.routers import DefaultRouter

from .albums.views import AlbumViewSet
from .categories.views import CategoryViewSet
from .favorites.views import FavoriteTrackViewSet, FavoriteArtistViewSet, FavoriteAlbumViewSet
from .playlists.views import ModeratorPlaylistViewSet, UserPlaylistViewSet
from .tracks.views import TrackViewSet

router = DefaultRouter()

router.register(r"categories", CategoryViewSet, basename="categories")
router.register(r"user-playlists", UserPlaylistViewSet, basename="user-playlists")
router.register(
    r"moderator-playlists", ModeratorPlaylistViewSet, basename="moderator-playlists"
)
router.register(r"tracks", TrackViewSet, basename="track")
router.register(r"albums", AlbumViewSet, basename="album")

router.register(r"favorite-tracks", FavoriteTrackViewSet, basename="favorite-tracks")
router.register(r"favorite-albums", FavoriteAlbumViewSet, basename="favorite-albums")
router.register(r"favorite-artists", FavoriteArtistViewSet, basename="favorite-artists")

urlpatterns = router.urls
