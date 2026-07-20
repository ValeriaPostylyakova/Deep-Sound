from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from apps.artists.services import send_track_update_status_to_artist
from apps.content.models import Album, Track
from apps.moderation.api.serializers import ReviewAlbumAndTrackSerializer
from apps.moderation.api.services.process_review_content import process_review_content
from apps.moderation.api.services.websocket import send_status_album_to_artist
from common.permissions import IsModeratorRole


class ModeratorViewSet(ViewSet):
    permission_classes = [IsAuthenticated, IsModeratorRole]

    @action(detail=True, methods=["POST"], url_path="review-album")
    def review_album(self, request, pk=None):
        serializer = ReviewAlbumAndTrackSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        process_review_content(
            model=Album,
            pk=pk,
            decision=serializer.validated_data["decision"],
            rejection_message=serializer.validated_data["rejection_message"],
            send_notification_callback=lambda obj, dec, rej_msg: send_status_album_to_artist(
                str(obj.author.user_id), str(obj.id), dec, rej_msg
            ),
        )
        return Response({"message": f"Альбом успешно переведен в статус {serializer.validated_data['decision']}"})

    @action(detail=True, methods=["POST"], url_path="review-track")
    def review_track(self, request, pk=None):
        serializer = ReviewAlbumAndTrackSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        process_review_content(
            model=Track,
            pk=pk,
            decision=serializer.validated_data["decision"],
            rejection_message=serializer.validated_data["rejection_message"],
            send_notification_callback=lambda obj, dec, rej_msg: send_track_update_status_to_artist(
                str(obj.author.user_id), str(obj.id), dec, rej_msg
            ),
        )
        return Response({"message": f"Трек успешно переведен в статус {serializer.validated_data['decision']}"})

# class ModeratorPlaylistViewSet(BasePlaylistViewSet):
#     permission_classes = [IsAuthenticated, IsModeratorRole]
#     write_serializer_class = Moderation
#
#     def get_queryset(self):
#         return Playlist.objects.filter(is_official=True)
