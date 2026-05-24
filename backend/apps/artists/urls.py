from rest_framework.routers import DefaultRouter

from .views import ArtistProfileViewSet

router = DefaultRouter()

router.register("", ArtistProfileViewSet)

urlpatterns = router.urls
