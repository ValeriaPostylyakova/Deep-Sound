from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.common.utils.get_image_url import get_image_url
from apps.music.api.serializers.tracks.read import TrackReadSerializer
from apps.music.models import Playlist

User = get_user_model()


class PlaylistReadSerializer(serializers.ModelSerializer):
    image_small = serializers.SerializerMethodField()
    image_medium = serializers.SerializerMethodField()
    image_large = serializers.SerializerMethodField()

    tracks = TrackReadSerializer(many=True)
    category = serializers.StringRelatedField()
    author = serializers.StringRelatedField()

    rejection_message = serializers.CharField(read_only=True)

    class Meta:
        model = Playlist
        fields = (
            "id",
            "name",
            "image_small",
            "image_medium",
            "image_large",
            "category",
            "author",
            "tracks",
            "type",
            "is_official",
            "status",
            "rejection_message",
            "created_at",
            "updated_at",
        )

        read_only_fields = ("id", "created_at", "updated_at")

    def get_image_small(self, obj):
        return get_image_url(obj.image, 50)

    def get_image_medium(self, obj):
        return get_image_url(obj.image, 100)

    def get_image_large(self, obj):
        return get_image_url(obj.image, 200)
