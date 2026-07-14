from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from apps.moderation.api.serializers import ReviewAlbumAndTrackSerializer
from apps.moderation.api.services import process_review
from apps.music.api.albums.services import send_status_album_to_user
from apps.music.models import Album, Track
from common.permissions import IsModeratorRole


class ModeratorViewSet(ViewSet):
    permission_classes = [IsAuthenticated, IsModeratorRole]

    @action(detail=True, methods=["POST"], url_path="review-album")
    def review_album(self, request, pk=None):
        serializer = ReviewAlbumAndTrackSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        process_review(
            model=Album,
            pk=pk,
            decision=serializer.validated_data["decision"],
            rejection_message=serializer.validated_data["rejection_message"],
            send_notification_callback=lambda obj, dec, rej_msg: send_status_album_to_user(
                str(request.user.id), str(obj.id), dec, rej_msg
            ),
        )
        return Response({"message": f"Альбом успешно переведен в статус {request.data.get('decision')}"})

    @action(detail=True, methods=["POST"], url_path="review-track")
    def review_track(self, request, pk=None):
        serializer = ReviewAlbumAndTrackSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        process_review(
            model=Track,
            pk=pk,
            decision=serializer.validated_data["decision"],
            rejection_message=serializer.validated_data["rejection_message"],
            send_notification_callback=lambda obj, dec, rej_msg: send_status_album_to_user(
                str(request.user.id), str(obj.id), dec, rej_msg
            ),
        )
        return Response({"message": f"Трек успешно переведен в статус {request.data.get('decision')}"})
