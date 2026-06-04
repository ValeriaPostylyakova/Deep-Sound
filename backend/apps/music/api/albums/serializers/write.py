from rest_framework import serializers

from apps.artists.models import Artist
from apps.music.models import Album, Category


class WriteAlbumSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=Artist.objects.all())
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    class Meta:
        model = Album
        fields = ("id", "name", "image", "author", "category")
