from rest_framework import serializers

from apps.common.utils.get_image_url import get_image_url
from apps.music.models import Track


class TrackShortSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    album = serializers.StringRelatedField(read_only=True)
    author = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Track
        fields = ("id", "title", "image", "author", "duration", "album")

    def get_image(self, obj):
        return get_image_url(obj.image, 50)


class TrackListSerializer(TrackShortSerializer):
    def get_image(self, obj):
        return get_image_url(obj.image, 100)


class TrackDetailSerializer(TrackShortSerializer):
    class Meta(TrackShortSerializer.Meta):
        fields = TrackShortSerializer.Meta.fields + ("text",)

    def get_image(self, obj):
        return get_image_url(obj.image, 150)
