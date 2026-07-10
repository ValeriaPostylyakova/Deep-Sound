from rest_framework import serializers

from apps.artists.models import Artist
from common.utils.get_image_url import get_image_url


class ArtistProfileStandardSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = Artist
        fields = (
            "id",
            "name",
            "avatar",
            "is_verified",
            "bio",
        )

    def get_avatar(self, obj):
        return get_image_url(obj.avatar, 200)
