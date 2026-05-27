from rest_framework import permissions, viewsets

from apps.music.models import Category

from ..serializers.categories.read import CetegoryReadSerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CetegoryReadSerializer
    permission_classes = [permissions.AllowAny]

    lookup_field = "slug"

    def get_queryset(self):
        if self.action == "retrieve":
            return Category.objects.prefetch_related("playlists", "tracks").all()
        return Category.objects.all()
