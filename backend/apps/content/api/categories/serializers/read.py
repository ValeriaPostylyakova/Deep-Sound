from rest_framework import serializers

from apps.content.api.albums.serializers.read import AlbumListSerializer
from apps.content.api.tracks.serializers.read import TrackListSerializer
from apps.content.models import Category


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
