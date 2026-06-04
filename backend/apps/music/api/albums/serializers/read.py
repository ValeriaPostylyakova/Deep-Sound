from rest_framework import serializers

from apps.common.utils.get_image_url import get_image_url
from apps.music.models import Album


class ReadAlbumSerializer(serializers.ModelSerializer):
    image_small = serializers.SerializerMethodField()
    image_medium = serializers.SerializerMethodField()

    class Meta:
        model = Album
        fields = (
            "id",
            "name",
            "image_small",
            "image_medium",
            "author",
            "category",
            "status",
            "created_at",
        )
        read_only_fields = ("id", "created_at")

    def get_image_small(self, obj):
        return get_image_url(obj.image, 100)

    def get_image_medium(self, obj):
        return get_image_url(obj.image, 150)
