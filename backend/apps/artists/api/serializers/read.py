from rest_framework import serializers

from apps.artists.models import Artist
from apps.common.utils.get_image_url import get_image_url
from apps.music.api.playlists.serializers.read import PlaylistReadSerializer
from apps.music.api.tracks.serializers.read import TrackReadSerializer


class ArtistProfileReadSerializer(serializers.ModelSerializer):
    playlists = serializers.SerializerMethodField()
    tracks = serializers.SerializerMethodField()

    avatar_small = serializers.SerializerMethodField()
    avatar_medium = serializers.SerializerMethodField()
    avatar_large = serializers.SerializerMethodField()

    class Meta:
        model = Artist
        fields = (
            "id",
            "name",
            "avatar_small",
            "avatar_medium",
            "avatar_large",
            "is_verified",
            "bio",
            "is_active",
            "playlists",
            "tracks",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")

    def get_avatar_small(self, obj):
        return get_image_url(obj.avatar, 64)

    def get_avatar_medium(self, obj):
        return get_image_url(obj.avatar, 128)

    def get_avatar_large(self, obj):

        return get_image_url(obj.avatar, 256)

    def get_playlists(self, obj):
        filtered_playlists = obj.user.playlists.filter(type="artist").order_by(
            "-created_at"
        )[:3]
        return PlaylistReadSerializer(filtered_playlists, many=True).data

    def get_tracks(self, obj):
        filtered_tracks = obj.tracks.all().order_by("-created_at")[:2]
        return TrackReadSerializer(filtered_tracks, many=True).data
