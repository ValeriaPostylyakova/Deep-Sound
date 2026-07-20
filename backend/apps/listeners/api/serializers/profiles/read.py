from rest_framework import serializers

from apps.listeners.models import ListenerProfile
from common.utils.get_image_url import get_image_url


class ListenerProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = ListenerProfile
        fields = ("avatar",)
        read_only_fields = ("id",)

    def get_avatar(self, obj):
        return get_image_url(obj.avatar, 50)
