from rest_framework import serializers

from apps.common.utils.get_image_url import get_image_url
from apps.music.models import Track, FavoriteTrack


class TrackShortSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    author = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Track
        fields = ("id", "title", "image", "author")
        read_only_fields = ("id", "author",)

    def get_image(self, obj):
        return get_image_url(obj.image, 50)


class TrackListSerializer(TrackShortSerializer):
    album = serializers.StringRelatedField(read_only=True)

    class Meta(TrackShortSerializer.Meta):
        fields = TrackShortSerializer.Meta.fields + ("album",)
        read_only_fields = TrackShortSerializer.Meta.read_only_fields + ("album",)

    def get_image(self, obj):
        return get_image_url(obj.image, 100)


class TrackDetailSerializer(TrackShortSerializer):
    class Meta(TrackShortSerializer.Meta):
        fields = TrackShortSerializer.Meta.fields + ("audio", "duration", "text")
        read_only_fields = TrackShortSerializer.Meta.read_only_fields + ("audio", "duration", "text")

    def get_image(self, obj):
        return get_image_url(obj.image, 150)


class TrackAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ("id", "title", "author", "duration")
        read_only_fields = ("id", "author", "duration")


class FavoriteTrackSerializer(serializers.ModelSerializer):
    track = TrackShortSerializer()
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = FavoriteTrack
        fields = ("id", "track", "user")
        read_only_fields = ("id", "user")
