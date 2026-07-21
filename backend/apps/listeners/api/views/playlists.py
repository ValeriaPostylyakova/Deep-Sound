from django.db.models import Count, Sum
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.content.api.tracks.serializers.read import TrackListSerializer, TrackShortSerializer
from apps.content.models import Track
from apps.content.paginations.cursor_paginations import TracksCursorPagination
from apps.listeners.api.paginations import ListenerPlaylistsSetNumberPagination
from apps.listeners.api.serializers.playlists.read import ListenerPlaylistListSerializer, \
    ListenerPlaylistDetailSerializer, ListenerPlaylistMainPageSerializer
from apps.listeners.api.serializers.playlists.write import ListenerPlaylistWriteSerializer
from apps.listeners.models import ListenerPlaylist
from common.permissions import IsOwner


class ListenerPlaylistViewSet(viewsets.ModelViewSet):
    queryset = ListenerPlaylist.objects.all()
    serializer_class = ListenerPlaylistListSerializer
    pagination_class = ListenerPlaylistsSetNumberPagination
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        queryset = self.queryset.filter(author=self.request.user)

        if self.action in ['retrieve', 'main_page_playlists']:
            queryset = queryset.annotate(
                tracks_count=Count('tracks', distinct=True),
                duration=Sum('tracks__duration')
            )
        return queryset

    def get_serializer_class(self):
        if self.request.method in ["PATCH", "POST"]:
            return ListenerPlaylistWriteSerializer
        if self.action == "main_page_playlists":
            return ListenerPlaylistMainPageSerializer
        if self.action == 'retrieve':
            return ListenerPlaylistDetailSerializer
        return self.serializer_class

    @action(detail=False, methods=['GET'], url_path='main-page')
    def main_page_playlists(self, request):
        self.pagination_class = None
        queryset = self.get_queryset().only("id", "name", "image")

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

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

    @action(detail=True, methods=["GET"], pagination_class=TracksCursorPagination)
    def tracks(self, request, pk=None):
        playlist = self.get_object()
        tracks_queryset = playlist.tracks.all().select_related("author", "album")

        page = self.paginate_queryset(tracks_queryset)
        if page is not None:
            serializer = TrackShortSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = TrackListSerializer(tracks_queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
