from rest_framework import serializers

from apps.artists.models import Artist
from apps.music.models import Category, Track


class TrackWriteSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    audio = serializers.FileField(required=True)
    duration = serializers.FloatField(read_only=True)
    status = serializers.CharField(read_only=True)

    author = serializers.PrimaryKeyRelatedField(queryset=Artist.objects.all())
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    class Meta:
        model = Track
        fields = (
            "id",
            "title",
            "image",
            "audio",
            "author",
            "category",
            "status",
            "duration",
        )

        read_only_fields = ("id", "created_at", "duration", "status")

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
