from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.common.permissions import IsOwner, IsOwnerOrReadOnly
from apps.music.models import Playlist, Track

from .serializers.read import PlaylistReadSerializer
from .serializers.write import (
    PlaylistArtistWriteSerializer,
    PlaylistUserWriteSerializer,
)


class BasePlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all().order_by("-created_at")
    serializer_class = PlaylistReadSerializer

    playlist_type = None
    write_serializer_class = None

    def get_queryset(self):
        user = self.request.user
        return Playlist.objects.filter(author=user, type=self.playlist_type)

    def get_serializer_class(self):
        if self.request.method in ["PATCH", "POST"]:
            return self.write_serializer_class
        return self.serializer_class

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        instance.refresh_from_db()

        response_serializer = self.serializer_class(
            instance, context={"request": request}
        )
        return Response(response_serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["POST"], url_path="add-track")
    def add_track(self, request, pk=None):
        playlist = self.get_object()
        track_id = request.data.get("track_id")

        try:
            find_track = Track.objects.filter(id=track_id).first()

            if not find_track:
                return Response(
                    {"message": "Такого трека не существует"},
                    status=status.HTTP_404_NOT_FOUND,
                )

            playlist.tracks.add(find_track)
            return Response(
                {"message": "Трек успешно добавлен в плейлист"},
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserPlaylistViewSet(BasePlaylistViewSet):
    permissions_classes = [IsOwner]
    playlist_type = "user"
    write_serializer_class = PlaylistUserWriteSerializer

    def get_queryset(self):
        return super().get_queryset().filter(status="draft", is_official=False)


class ArtistPlaylistViewSet(BasePlaylistViewSet):
    permission_classes = [IsOwnerOrReadOnly]
    playlist_type = "artist"
    write_serializer_class = PlaylistArtistWriteSerializer

    def get_queryset(self):
        return super().get_queryset().filter(type="artist")
