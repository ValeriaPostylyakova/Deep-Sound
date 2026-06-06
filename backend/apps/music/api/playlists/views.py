from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.common.permissions import IsModerator, IsOwner
from apps.music.models import Playlist, Track

from .serializers.read import PlaylistReadSerializer
from .serializers.write import (
    PlaylistModeratorWriteSerializer,
    PlaylistUserWriteSerializer,
)


class BasePlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all().order_by("-created_at")
    serializer_class = PlaylistReadSerializer

    write_serializer_class = None

    def get_queryset(self):
        user = self.request.user
        if user.role.filter(name="moderator").exists():
            return self.queryset.filter(is_official=True)
        return self.queryset.filter(author=user)

    def get_serializer_class(self):
        if self.request.method in ["PATCH", "POST"]:
            return self.write_serializer_class
        return self.serializer_class

    @action(detail=True, methods=["POST"], url_path="add-track")
    def add_track(self, request, pk=None):
        playlist = self.get_object()

        track = get_object_or_404(Track, pk=pk)

        playlist.tracks.add(track)
        return Response(
            {"message": "Трек успешно добавлен в плейлист"},
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["DELETE"], url_path="delete-track")
    def delete_track(self, request, pk=None):
        playlist = self.get_object()

        track = get_object_or_404(Track, pk=pk)

        playlist.tracks.remove(track)
        return Response(
            {"message": "Трек успешно удален из плейлиста"},
            status=status.HTTP_200_OK,
        )


class UserPlaylistViewSet(BasePlaylistViewSet):
    permissions_classes = [IsOwner]
    write_serializer_class = PlaylistUserWriteSerializer


class ModeratorPlaylistViewSet(BasePlaylistViewSet):
    permissions_classes = [IsModerator]
    write_serializer_class = PlaylistModeratorWriteSerializer
