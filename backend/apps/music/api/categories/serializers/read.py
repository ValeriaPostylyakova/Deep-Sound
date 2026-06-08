from rest_framework import serializers

from apps.music.api.albums.serializers.read import AlbumListSerializer
from apps.music.api.tracks.serializers.read import TrackListSerializer
from apps.music.models import Category


class CategoryShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            "name",
            "slug",
        )
        read_only_fields = ("slug",)


class CategoryStandardSerializer(CategoryShortSerializer):
    albums = AlbumListSerializer(many=True)
    tracks = TrackListSerializer(many=True)

    class Meta(CategoryShortSerializer.Meta):
        fields = CategoryShortSerializer.Meta.fields + ("albums", "tracks")
