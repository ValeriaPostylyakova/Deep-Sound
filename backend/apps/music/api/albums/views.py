from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.common.permissions import IsArtist, IsModerator, IsOwner
from apps.music.api.tracks.serializers.write import TrackWriteSerializer
from apps.music.models import Album, Track

from .serializers.read import ReadAlbumSerializer
from .serializers.write import WriteAlbumSerializer
from .services import send_status_album_to_user, send_to_moderator
from .tasks import proccess_track_to_album


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all().select_related("category", "author")

    def get_serializer_class(self):
        if self.request.method in ["POST", "PATCH", "PUT"]:
            return WriteAlbumSerializer
        return ReadAlbumSerializer

    def get_permissions(self):
        if self.action == "review":
            return [IsModerator()]
        return [IsArtist()]

    @action(detail=True, methods=["POST"], url_path="add-track")
    def add_track(self, request, *args, **kwargs):
        album = self.get_object()

        data = request.data.copy()

        data["category"] = album.category.id
        data["author"] = album.author.id
        data["album"] = album.id

        serializer = TrackWriteSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        track = serializer.save(album=album)

        transaction.on_commit(lambda: proccess_track_to_album.delay(track.id))

        return Response(
            {"message": "Трек успешно добавлен в альбом"},
            status=status.HTTP_201_CREATED,
        )

    @action(detail=True, methods=["POST"], url_path="delete-track")
    def delete_track(self, request, *args, **kwargs):
        album = self.get_object()
        track_id = request.data.get("track_id")

        album.tracks.remove(track_id)

        return Response({"message": "Трек успешно удален из альбома"})

    @action(detail=True, methods=["POST"], url_path="send-to-moderation")
    def send_to_moderation(self, request, pk=None):

        album = get_object_or_404(
            Album.objects.select_related("author", "category").prefetch_related(
                "tracks__author", "tracks__category"
            ),
            pk=pk,
        )

        with transaction.atomic():
            album.status = "pending"
            album.save(update_fields=["status"])

            transaction.on_commit(lambda: send_to_moderator(album))
            transaction.on_commit(
                lambda: send_status_album_to_user(
                    request.user.id, str(album.id), album.status
                )
            )

        return Response({"message": "Альбом отправлен на модерацию"})

    @action(detail=True, methods=["POST"], url_path="review")
    def review(self, request, pk=None):
        album = self.get_object()

        decision = request.data.get("decision")
        rejection_message = request.data.get("rejection_message", None)

        if decision == "approved":
            with transaction.atomic():
                album.status = "approved"
                album.save(update_fields=["status"])

                transaction.on_commit(
                    lambda: send_status_album_to_user(
                        str(request.user.id), str(album.id), album.status
                    )
                )

        elif decision == "rejected":
            with transaction.atomic():
                album.status = "rejected"
                album.rejection_message = rejection_message

                if not rejection_message:
                    return Response(
                        {"message": "Укажите причину отказа"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                album.save(update_fields=["status", "rejection_message"])

                transaction.on_commit(
                    lambda: send_status_album_to_user(
                        str(request.user.id), str(album.id), album.status
                    )
                )
        else:
            return Response(
                {"message": "Неверное действие. Ожидается 'approved' или 'rejected'"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response({"message": "Альбом успешно проверен"})
