from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/auth/", include("apps.authentication.api.urls")),
    path("api/v1/content/", include("apps.content.api.urls")),
    path("api/v1/artists/", include("apps.artists.api.urls")),
    path("api/v1/listeners/", include("apps.listeners.api.urls")),
    path("api/v1/moderation/", include("apps.moderation.api.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
