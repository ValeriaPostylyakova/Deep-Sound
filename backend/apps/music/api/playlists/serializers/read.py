from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.common.utils.get_image_url import get_image_url
from apps.music.api.tracks.serializers.read import TrackReadSerializer, TrackListSerializer
from apps.music.models import Playlist

User = get_user_model()

class PlaylistMainPageSerializer(serializers.ModelSerializer):
    tracks_count = serializers.IntegerField(read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Playlist
        fields = ("id", "name", "image", "tracks_count")
        read_only_fields = ("id", "tracks_count")

    def get_image(self, obj):
        return get_image_url(obj.image, 50)

class PlaylistShortSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    author = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Playlist
        fields = ("id", "name", "image", "author")
        read_only_fields = ("id", )

    def get_image(self, obj):
        return get_image_url(obj.image, 50)

class PlaylistListSerializer(PlaylistShortSerializer):
    def get_image(self, obj):
        return get_image_url(obj.image, 100)

class PlaylistDetailSerializer(PlaylistListSerializer):
    tracks_count = serializers.IntegerField(read_only=True)
    duration = serializers.IntegerField(read_only=True)

    class Meta(PlaylistListSerializer.Meta):
        fields = PlaylistListSerializer.Meta.fields + ("duration", "tracks_count")


    def get_image(self, obj):
        return get_image_url(obj.image, 150)


class PlaylistFullSerializer(serializers.ModelSerializer):
    image_small = serializers.SerializerMethodField()
    image_medium = serializers.SerializerMethodField()
    image_large = serializers.SerializerMethodField()

    tracks = TrackReadSerializer(many=True)
    category = serializers.StringRelatedField()

    count_tracks = serializers.SerializerMethodField()

    class Meta:
        model = Playlist
        fields = (
            "id",
            "name",
            "image_small",
            "image_medium",
            "image_large",
            "category",
            "tracks",
            "is_official",
            "count_tracks",
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

    def get_count_tracks(self, obj):
        return obj.tracks.count()
