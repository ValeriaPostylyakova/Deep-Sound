from rest_framework import serializers

from apps.artists.models import Artist
from apps.music.models import Album, Category


class AlbumWriteSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=Artist.objects.all())
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    class Meta:
        model = Album
        fields = ("id", "name", "image", "author", "category")
        read_only_fields = ("id", "author", "category")

    validators = [
        serializers.UniqueTogetherValidator(
            queryset=Album.objects.all(),
            fields=["name", "author"],
            message="Альбом с таким названием уже существует. Пожалуйста, введите другое название.",
        )
    ]
