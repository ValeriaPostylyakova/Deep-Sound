from rest_framework import serializers

from apps.artists.models import Artist
from apps.music.api.serializers.playlist.read import PlaylistReadSerializer
from apps.music.api.serializers.tracks.read import TrackReadSerializer


class ArtistProfileReadSerializer(serializers.ModelSerializer):
    playlists = PlaylistReadSerializer(
        source="user.playlists", many=True, read_only=True
    )
    tracks = TrackReadSerializer(source="user.tracks", many=True, read_only=True)

    class Meta:
        model = Artist
        fields = (
            "id",
            "name",
            "avatar",
            "is_verified",
            "bio",
            "is_active",
            "playlists",
            "tracks",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")
