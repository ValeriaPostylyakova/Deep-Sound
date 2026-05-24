from rest_framework.routers import DefaultRouter

from .views.categories import CategoryViewSet

router = DefaultRouter()

router.register("categories", CategoryViewSet)

urlpatterns = router.urls
