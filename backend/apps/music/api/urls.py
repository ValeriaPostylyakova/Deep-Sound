from rest_framework.routers import DefaultRouter

from .categories.views import CategoryViewSet
from .playlists.views import ArtistPlaylistViewSet, UserPlaylistViewSet
from .tracks.views import TrackViewSet

router = DefaultRouter()

router.register("categories", CategoryViewSet, basename="categories")
router.register("user-playlists", UserPlaylistViewSet, basename="user-playlists")
router.register("artist-playlists", ArtistPlaylistViewSet, basename="artist-playlists")
router.register(r"tracks", TrackViewSet, basename="track")


urlpatterns = router.urls
