from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.artists.api.permissions import IsCurrentArtistProfile
from apps.content.api.albums.serializers.read import AlbumListSerializer
from apps.content.api.tracks.serializers.read import TrackListSerializer
from common.permissions import IsArtistRole
from .serializers.read import ArtistProfileStandardSerializer
from .serializers.write import ArtistProfileWriteSerializer
from ..models import ArtistProfile


class ArtistProfileViewSet(viewsets.ModelViewSet):
    queryset = ArtistProfile.objects.all()
    serializer_class = ArtistProfileStandardSerializer

    def get_queryset(self):
        if self.action in ['list', 'retrieve']:
            return ArtistProfile.objects.all()
        return ArtistProfile.objects.filter(user=self.request.user)

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [IsArtistRole(), IsCurrentArtistProfile()]

    def get_serializer_class(self):
        if self.request.method in ["PATCH"]:
            return ArtistProfileWriteSerializer
        return ArtistProfileStandardSerializer

    def retrieve(self, request, *args, **kwargs):
        artist_profile = self.get_object()

        albums = (
            artist_profile.albums
            .select_related('category')
            .all()
            .order_by('-created_at')[:5]
        )

        tracks = (
            artist_profile.tracks
            .select_related('album', 'category', 'text')
            .all()
            .order_by('-created_at')[:5]
        )

        albums_serializer = AlbumListSerializer(albums, many=True, context={'request': request})
        tracks_serializer = TrackListSerializer(tracks, many=True, context={'request': request})

        return Response({
            "artist_profile": artist_profile,
            "albums": albums_serializer.data,
            "tracks": tracks_serializer.data
        })

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        instance.refresh_from_db()

        read_serializer = ArtistProfileStandardSerializer(
            instance, context=self.get_serializer_context()
        )

        return Response(read_serializer.data, status=status.HTTP_200_OK)
