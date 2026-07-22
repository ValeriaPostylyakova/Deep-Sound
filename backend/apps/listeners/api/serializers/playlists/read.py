from rest_framework import serializers

from apps.listeners.models import ListenerPlaylist
from common.utils.get_image_url import get_image_url


class ListenerPlaylistMainPageSerializer(serializers.ModelSerializer):
    tracks_count = serializers.IntegerField(read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = ListenerPlaylist
        fields = ("id", "name", "image", "tracks_count")
        read_only_fields = ("id", "tracks_count")

    def get_image(self, obj):
        return get_image_url(obj.image, 50)


class ListenerPlaylistShortSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = ListenerPlaylist
        fields = ("id", "name", "image", "author",)
        read_only_fields = ("id",)

    def get_image(self, obj):
        return get_image_url(obj.image, 50)


class ListenerPlaylistListSerializer(ListenerPlaylistShortSerializer):
    def get_image(self, obj):
        return get_image_url(obj.image, 100)


class ListenerPlaylistDetailSerializer(ListenerPlaylistListSerializer):
    tracks_count = serializers.IntegerField(read_only=True)
    duration = serializers.IntegerField(read_only=True)

    class Meta(ListenerPlaylistListSerializer.Meta):
        fields = ListenerPlaylistListSerializer.Meta.fields + ("duration", "tracks_count")

    def get_image(self, obj):
        return get_image_url(obj.image, 150)
