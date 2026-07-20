from rest_framework.routers import DefaultRouter

from .albums.views import AlbumViewSet
from .categories.views import CategoryViewSet
from .tracks.views import TrackViewSet

router = DefaultRouter()

router.register(r"categories", CategoryViewSet, basename="categories")
router.register(r"tracks", TrackViewSet, basename="track")
router.register(r"albums", AlbumViewSet, basename="album")

urlpatterns = router.urls
