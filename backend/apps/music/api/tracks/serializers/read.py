from rest_framework import serializers

from apps.common.utils.get_image_url import get_image_url
from apps.music.models import Track


class TrackShortSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    album = serializers.StringRelatedField(read_only=True)
    author = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Track
        fields = ("id", "title", "image", "audio", "author", "duration", "album")
        read_only_fields = ("id", "author", "album", "duration", "audio")

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


class TrackAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ("id", "title", "author", "duration")
        read_only_fields = ("id", "author", "duration")
