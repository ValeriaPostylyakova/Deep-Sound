from django.db import transaction
from django.db.models import Count, Sum
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from apps.music.api.tracks.serializers.write import TrackWriteSerializer
from apps.music.models import Album
from common.permissions import IsArtist, IsModerator
from .serializers.read import AlbumListSerializer, AlbumDetailSerializer
from .serializers.write import AlbumWriteSerializer
from .tasks import proccess_track_to_album


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = (
        Album.objects.all()
        .select_related("author")
    )

    def get_queryset(self):
        queryset = self.queryset

        if self.action == 'retrieve':
            queryset.annotate(
                tracks_count=Count('tracks', distinct=True),
                duration=Sum('tracks__duration')
            ).select_related('category').prefetch_related('tracks')
        return queryset

    def get_serializer_class(self):
        if self.request.method in ["POST", "PATCH", "PUT"]:
            return AlbumWriteSerializer
        if self.action == 'retrieve':
            return AlbumDetailSerializer
        return AlbumListSerializer

    def get_permissions(self):
        if self.action == "review":
            return [IsAuthenticated(), IsModerator()]
        elif self.action == 'list':
            return [AllowAny()]
        return [IsAuthenticated(), IsArtist()]

    def perform_destroy(self, instance):
        instance.tracks.all().update(album=None)
        instance.delete()

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

    @action(detail=True, methods=["DELETE"], url_path="remove-track")
    def remove_track(self, request, *args, **kwargs):
        album = self.get_object()
        track_id = request.data.get("track_id")

        track = album.tracks.filter(id=track_id).first()

        if not track:
            return Response(
                {"message": "Трек не найден в этом альбоме."},
                status=status.HTTP_404_NOT_FOUND,
            )

        album.tracks.remove(track)

        return Response(
            {"message": "Трек успешно удален из альбома"},
            status=status.HTTP_204_NO_CONTENT,
        )

    @action(detail=True, methods=["POST"], url_path="send-to-moderation")
    def send_to_moderation(self, request, pk=None):
        album = get_object_or_404(Album, pk=pk)

        with transaction.atomic():
            album.status = "pending"
            album.save(update_fields=["status"])

        return Response({"message": "Альбом отправлен на модерацию"})
