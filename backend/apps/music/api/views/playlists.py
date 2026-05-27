from rest_framework import permissions, viewsets

from apps.common.permissions import IsArtist
from apps.music.api.serializers.playlist.read import PlaylistReadSerializer
from apps.music.api.serializers.playlist.write import (
    PlaylistArtistWriteSerializer,
    PlaylistUserWriteSerializer,
)
from apps.music.models import Playlist


class UserPlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all().order_by("-created_at")
    permissions_classes = [permissions.IsAuthenticated]
    serializer_class = PlaylistReadSerializer

    def get_queryset(self):
        user = self.request.user
        return Playlist.objects.filter(
            author=user, type="user", status="draft", is_official=False
        )

    def get_serializer_class(self):
        if self.request.method in ["PATCH", "POST"]:
            return PlaylistUserWriteSerializer
        return PlaylistReadSerializer


class ArtistPlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all().order_by("-created_at")
    permission_classes = [IsArtist]
    serializer_class = PlaylistReadSerializer

    def get_queryset(self):
        user = self.request.user
        return Playlist.objects.filter(author=user, type="artist")

    def get_serializer_class(self):
        if self.request.method in ["PATCH", "POST"]:
            return PlaylistArtistWriteSerializer
        return PlaylistReadSerializer
