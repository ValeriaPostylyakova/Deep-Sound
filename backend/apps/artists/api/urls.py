from rest_framework.routers import DefaultRouter

from apps.artists.api.views import ArtistProfileViewSet

router = DefaultRouter()

router.register("", ArtistProfileViewSet)

urlpatterns = []

urlpatterns += router.urls
