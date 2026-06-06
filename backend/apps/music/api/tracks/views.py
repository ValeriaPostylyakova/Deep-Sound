from django.conf import settings
from django.db import transaction
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.common.permissions import IsArtist, IsModerator
from apps.music.api.tracks.services import send_track_update_to_user
from apps.music.models import Track

from .serializers.read import TrackReadSerializer
from .serializers.write import TrackWriteSerializer
from .tasks import process_track
from .utils.stream_track import process_stream_track


class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all().select_related("author", "album", "category")
    lookup_value_regex = r"[a-f0-9\-]+"

    def get_serializer_class(self):
        if self.request.method in ["PATCH", "POST"]:
            return TrackWriteSerializer
        return TrackReadSerializer

    def get_permissions(self):
        if self.action == "list":
            return [AllowAny()]
        elif self.action == "review":
            return [IsModerator()]
        return [IsArtist()]

    def perform_create(self, serializer):
        with transaction.atomic():
            user = self.request.user
            artist = user.artist
            track = serializer.save(author=artist)
            transaction.on_commit(lambda: process_track(str(track.id), str(user.id)))

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

        bucket_name = settings.AWS_STORAGE_BUCKET_NAME
        object_name = track.audio.name

        return process_stream_track(request, bucket_name, object_name)
