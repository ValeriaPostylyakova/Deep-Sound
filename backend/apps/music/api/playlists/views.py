from django.db.models import Sum, Count
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.common.permissions import IsModerator, IsOwner
from apps.music.api.paginations.cursor_paginations import PlaylistTracksCursorPagination
from apps.music.api.paginations.number_paginations import PlaylistsSetNumberPagination
from apps.music.models import Playlist, Track
from .serializers.read import PlaylistListSerializer, PlaylistMainPageSerializer, PlaylistDetailSerializer
from .serializers.write import (
    PlaylistModeratorWriteSerializer,
    PlaylistUserWriteSerializer,
)
from ..tracks.serializers.read import TrackListSerializer, TrackShortSerializer


class BasePlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistListSerializer
    pagination_class = PlaylistsSetNumberPagination

    write_serializer_class = None

    def get_queryset(self):
        if self.action in ['retrieve', 'main_page_playlists']:
            queryset = self.queryset.annotate(
                tracks_count=Count('tracks', distinct=True),
                duration=Sum('tracks__duration')
            )
        return queryset

    def get_serializer_class(self):
        if self.request.method in ["PATCH", "POST"]:
            return self.write_serializer_class
        if self.action == "main_page_playlists":
            return PlaylistMainPageSerializer
        if self.action == 'retrieve':
            return PlaylistDetailSerializer
        return self.serializer_class

    @action(detail=True, methods=["POST"], url_path="add-track")
    def add_track(self, request, pk=None):
        playlist = self.get_object()

        track_id = request.data.get("track_id")

        track = get_object_or_404(Track, id=track_id)

        playlist.tracks.add(track)
        return Response(
            {"message": "Трек успешно добавлен в плейлист"},
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["DELETE"], url_path="remove-track")
    def remove_track(self, request, pk=None):
        playlist = self.get_object()

        track_id = request.data.get('track_id')
        track = get_object_or_404(Track, id=track_id)

        playlist.tracks.remove(track)
        return Response(
            {"message": "Трек успешно удален из плейлиста"},
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["GET"], pagination_class=PlaylistTracksCursorPagination)
    def tracks(self, request, pk=None):
        playlist = self.get_object()

        tracks_queryset = playlist.tracks.all().select_related("author", "album")
        page = self.paginate_queryset(tracks_queryset)
        if page is not None:
            serializer = TrackShortSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = TrackListSerializer(tracks_queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserPlaylistViewSet(BasePlaylistViewSet):
    permission_classes = [IsAuthenticated, IsOwner]
    write_serializer_class = PlaylistUserWriteSerializer

    def get_queryset(self):
        return Playlist.objects.filter(author=self.request.user, is_official=False)

    @action(detail=False, methods=['GET'], url_path='main-page')
    def main_page_playlists(self, request):
        self.pagination_class = None
        queryset = self.get_queryset().only("id", "name", "image")

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ModeratorPlaylistViewSet(BasePlaylistViewSet):
    permission_classes = [IsAuthenticated, IsModerator]
    write_serializer_class = PlaylistModeratorWriteSerializer

    def get_queryset(self):
        return Playlist.objects.filter(is_official=True)
