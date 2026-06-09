from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from apps.artists.models import Artist
from apps.music.models import Album, Category, Track, FavoriteTrack

User = get_user_model()


class TrackWriteSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    audio = serializers.FileField(required=True)

    author = serializers.PrimaryKeyRelatedField(queryset=Artist.objects.all())
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    album = serializers.PrimaryKeyRelatedField(
        queryset=Album.objects.all(), required=False
    )

    class Meta:
        model = Track
        fields = (
            "id",
            "title",
            "image",
            "audio",
            "author",
            "category",
            "album",
        )

        read_only_fields = ("id",)

    def validate_audio(self, value):
        import os

        ext = os.path.splitext(value.name)[1].lower()
        valid_extensions = [".mp3", ".wav", ".flac", ".ogg", ".m4a", ".aac"]

        if ext not in valid_extensions:
            raise serializers.ValidationError(
                f"Неподдерживаемый формат файла. Разрешены только: {', '.join(valid_extensions)}"
            )

        max_size = 50 * 1024 * 1024
        if value.size > max_size:
            raise serializers.ValidationError(
                "Файл слишком большой. Максимальный размер — 50 МБ."
            )

        return value


class FavoriteWriteTrackSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    track = serializers.PrimaryKeyRelatedField(queryset=Track.objects.all())

    class Meta:
        model = FavoriteTrack
        fields = ("user", "track")

        validators = [
            UniqueTogetherValidator(
                queryset=FavoriteTrack.objects.all(),
                fields=["user", "track"],
                message="Этот трек уже добавлен в избранное у данного пользователя.",
            )
        ]
