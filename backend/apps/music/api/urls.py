from rest_framework.routers import DefaultRouter

from .albums.views import AlbumViewSet
from .categories.views import CategoryViewSet
from .playlists.views import ArtistPlaylistViewSet, UserPlaylistViewSet
from .tracks.views import TrackViewSet

router = DefaultRouter()

router.register(r"categories", CategoryViewSet, basename="categories")
router.register(r"user-playlists", UserPlaylistViewSet, basename="user-playlists")
router.register(r"artist-playlists", ArtistPlaylistViewSet, basename="artist-playlists")
router.register(r"tracks", TrackViewSet, basename="track")
router.register(r"albums", AlbumViewSet, basename="album")


urlpatterns = router.urls
