from rest_framework import serializers

from apps.common.utils.get_image_url import get_image_url
from apps.music.api.tracks.serializers.read import TrackAlbumSerializer
from apps.music.models import Album


class AlbumListSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    author = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Album
        fields = ("id", "name", "image", "author")
        read_only_fields = ("id",)

    def get_image(self, obj):
        return get_image_url(obj.image, 100)


class AlbumWithStatusSerializer(AlbumListSerializer):
    status = serializers.CharField(read_only=True)

    class Meta(AlbumListSerializer.Meta):
        fields = AlbumListSerializer.Meta.fields + ("status",)


class AlbumDetailSerializer(AlbumListSerializer):
    tracks_count = serializers.IntegerField(read_only=True)
    tracks = TrackAlbumSerializer(many=True, read_only=True)
    duration = serializers.IntegerField(read_only=True)
    category = serializers.SlugRelatedField(slug_field='name', read_only=True)

    class Meta(AlbumListSerializer.Meta):
        fields = AlbumListSerializer.Meta.fields + ("category", "duration", "tracks_count", "tracks", "created_at")
        read_only_fields = ("created_at",)

    def get_image(self, obj):
        return get_image_url(obj.image, 150)
