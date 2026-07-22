import os

from django.db import transaction
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from apps.artists.api.permissions import IsCurrentAuthorArtist
from apps.content.models import Track
from apps.content.paginations.cursor_paginations import TracksCursorPagination
from common.permissions import IsArtistRole
from .serializers.read import TrackShortSerializer, TrackDetailSerializer, TrackListSerializer
from .serializers.write import TrackWriteSerializer
from .tasks import process_track
from .utils.stream_track import process_stream_track


class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all().select_related("author", "album")
    lookup_value_regex = r"[a-f0-9\-]+"

    pagination_class = TracksCursorPagination

    def get_serializer_class(self):
        if self.request.method in ["PATCH", "POST"]:
            return TrackWriteSerializer
        if self.action == 'retrieve':
            view_mode = self.request.query_params.get('view')

            serializers_map = {
                "short": TrackShortSerializer,
                "detail": TrackDetailSerializer,
            }

            return serializers_map.get(view_mode, TrackListSerializer)

        return TrackListSerializer

    def get_queryset(self):
        queryset = self.queryset

        if self.action == 'retrieve':
            view_mode = self.request.query_params.get('view')
            if view_mode == 'detail':
                return queryset.select_related("text")

        return queryset

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'stream_track']:
            return [AllowAny()]
        if self.action == 'destroy':
            return [IsAuthenticated(), IsCurrentAuthorArtist()]
        else:
            return [IsAuthenticated(), IsArtistRole()]

    def perform_create(self, serializer):
        with transaction.atomic():
            user = self.request.user
            artist = user.artist_profile
            track = serializer.save(author=artist)
            transaction.on_commit(lambda: process_track.delay(str(track.id), str(user.id)))

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)

        return Response(
            {"message": "Трек успешно загружен и отправлен на модерацию"},
            status=status.HTTP_201_CREATED
        )

    @action(detail=True, methods=["GET"], url_path="stream")
    def stream_track(self, request, pk=None):
        track = self.get_object()

        bucket_name = os.getenv('S3_BUCKET_NAME')
        object_name = track.audio.name

        return process_stream_track(request, bucket_name, object_name)
