from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.music.api.tracks.services import send_track_update_to_user
from apps.music.models import Track

from .serializers.read import TrackReadSerializer
from .serializers.write import TrackWriteSerializer
from .tasks import process_audio_track


class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all()
    lookup_value_regex = r"[a-f0-9\-]+"

    def get_serializer_class(self):
        if self.request.method in ["PATCH", "POST"]:
            return TrackWriteSerializer
        return TrackReadSerializer

    def perform_create(self, serializer):
        track = serializer.save(status="waiting")
        process_audio_track.delay(track.id)

    @action(detail=True, methods=["POST"], url_path="review")
    def review(self, request, pk=None):
        user = request.user
        if not user or not user.role.filter(name="moderator").exists():
            return Response(
                {"message": "Вы не являетесь модератором"},
                status=status.HTTP_403_FORBIDDEN,
            )

        track = self.get_object()
        user_id = track.author.id

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
