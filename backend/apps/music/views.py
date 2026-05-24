from rest_framework import permissions, viewsets

from ..authentication.permissions import IsModerator
from .models import Category, Playlist, Track
from .permissions import IsOwnerOrReadOnly
from .serializers import (
    CetegoryReadSerializer,
    PlaylistReadSerializer,
)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CetegoryReadSerializer
    permission_classes = [permissions.AllowAny]
