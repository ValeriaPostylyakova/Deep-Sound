from rest_framework import serializers

from apps.music.api.playlists.serializers.read import PlaylistReadSerializer
from apps.music.api.tracks.serializers.read import TrackReadSerializer
from apps.music.models import Category


class CetegoryReadSerializer(serializers.ModelSerializer):
    playlists = PlaylistReadSerializer(many=True)
    tracks = TrackReadSerializer(many=True)

    class Meta:
        model = Category
        fields = (
            "id",
            "name",
            "slug",
            "playlists",
            "tracks",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")
