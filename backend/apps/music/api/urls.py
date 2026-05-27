from rest_framework.routers import DefaultRouter

from .views.categories import CategoryViewSet
from .views.playlists import ArtistPlaylistViewSet, UserPlaylistViewSet

router = DefaultRouter()

router.register("categories", CategoryViewSet, basename="categories")
router.register("user-playlists", UserPlaylistViewSet, basename="user-playlists")
router.register("artist-playlists", ArtistPlaylistViewSet, basename="artist-playlists")


urlpatterns = router.urls
