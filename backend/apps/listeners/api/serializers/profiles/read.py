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


class ListenerProfileDefault:
    requires_context = True

    def __call__(self, serializer_filed):
        request = serializer_filed.context.get('request')
        if request and hasattr(request.user, 'listener_profile'):
            return request.user.listener_profile
        return None
