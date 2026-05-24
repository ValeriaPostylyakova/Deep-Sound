from rest_framework import serializers

from ..music.serializers import PlaylistReadSerializer, TrackReadSerializer
from .models import Artist


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


class ArtistProfileWriteSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(required=False)

    class Meta:
        model = Artist
        fields = ("id", "name", "avatar", "bio")

    def validate_name(self, value):
        if len(value) < 3:
            raise serializers.ValidationError(
                "Слишком короткое имя. Минимальная длина - 3 символа."
            )
        return value
