import os

from django.db import transaction
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from apps.common.permissions import IsArtist, IsModerator
from apps.music.api.tracks.services import send_track_update_to_user
from apps.music.models import Track
from .serializers.read import TrackShortSerializer, TrackDetailSerializer, TrackListSerializer
from .serializers.write import TrackWriteSerializer
from .tasks import process_track
from .utils.stream_track import process_stream_track
from ..paginations.cursor_paginations import PlaylistTracksCursorPagination


class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all().select_related("author", "album", "category")
    lookup_value_regex = r"[a-f0-9\-]+"

    pagination_class = PlaylistTracksCursorPagination

    def get_serializer_class(self):
        if self.request.method in ["PATCH", "POST"]:
            return TrackWriteSerializer
        if self.action == 'retrieve':
            view_mode = self.request.query_params.get('view')

            serializers_map = {
                "short": TrackShortSerializer,
                "detail": TrackDetailSerializer,
            }

            return serializers_map.get(view_mode)

        return TrackListSerializer

    def get_queryset(self):
        queryset = self.queryset

        if self.action == 'retrieve':
            view_mode = self.request.query_params.get('view')
            if view_mode == 'detail':
                return queryset.select_related("text")
        return queryset

    def get_permissions(self):
        if self.action == "review":
            return [IsAuthenticated(), IsModerator()]

        if self.action in ['list', 'retrieve', 'delete_all_tracks', 'stream_track']:
            return [AllowAny()]

        else:
            return [IsAuthenticated(), IsArtist()]

    def perform_create(self, serializer):
        with transaction.atomic():
            user = self.request.user
            artist = user.artist
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

    @action(detail=True, methods=["POST"], url_path="review")
    def review(self, request, pk=None):

        track = self.get_object()
        user_id = request.user.id

        decision = request.data.get("decision")

        if decision == "approved":
            track.status = "approved"
            track.rejection_message = None
            track.save(update_fields=["status", "rejection_message"])

            send_track_update_to_user(user_id, track.id, "approved")

        elif decision == "rejected":
            track.status = "rejected"
            track.rejection_message = request.data.get(
                "rejection_message", "Не прошло модерацию"
            )
            track.save(update_fields=["status", "rejection_message"])

            send_track_update_to_user(
                user_id, track.id, "rejected", track.rejection_message
            )

        else:
            return Response(
                {"message": "Неверное действие. Ожидается 'approved' или 'rejected'"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response({"status": f"Трек успешно переведен в статус {track.status}"})

    @action(detail=True, methods=["GET"], url_path="stream")
    def stream_track(self, request, pk=None):
        track = self.get_object()

        bucket_name = os.getenv('AWS_STORAGE_BUCKET_NAME')
        object_name = track.audio.name

        return process_stream_track(request, bucket_name, object_name)

    @action(detail=False, methods=['DELETE'], url_path="delete-all-tracks")
    def delete_all_tracks(self, request):
        try:
            tracks = Track.objects.all()
            tracks.delete()

            return Response({"message": "Все треки успешно удалены"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            print(e)
