from rest_framework.routers import DefaultRouter

from apps.moderation.api.views import ModeratorViewSet

router = DefaultRouter()
router.register(r'', ModeratorViewSet, basename='moderation')

urlpatterns = router.urls
