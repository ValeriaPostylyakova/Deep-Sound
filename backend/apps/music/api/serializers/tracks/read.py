from rest_framework import serializers

from apps.common.utils.get_image_url import get_image_url
from apps.music.models import Track


class TrackReadSerializer(serializers.ModelSerializer):
    image_small = serializers.SerializerMethodField()
    image_medium = serializers.SerializerMethodField()
    image_large = serializers.SerializerMethodField()

    class Meta:
        model = Track
        fields = (
            "id",
            "title",
            "image_small",
            "image_medium",
            "image_large",
            "audio",
            "status",
            "rejection_message",
            "author",
            "category",
            "duration",
            "created_at",
        )

        read_only_fields = ("id", "created_at")

    def get_image_small(self, obj):
        return get_image_url(obj.image, 50)

    def get_image_medium(self, obj):
        return get_image_url(obj.image, 100)

    def get_image_large(self, obj):
        return get_image_url(obj.image, 200)


class TrackWriteSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    audio = serializers.FileField(required=True)

    author = serializers.PrimaryKeyRelatedField(queryset=Track.objects.all())
    category = serializers.PrimaryKeyRelatedField(queryset=Track.objects.all())

    class Meta:
        model = Track
        fields = (
            "title",
            "image",
            "audio",
            "author",
            "category",
        )

        read_only_fields = ("id", "created_at")

    def validate_audio(self, value):
        if not value.name.endswith(".mp3") and not value.name.endswith(".wav"):
            raise serializers.ValidationError("The audio file must be mp3 or wav")
        return value
