from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.listeners.api.serializers.profiles.read import ListenerProfileSerializer

User = get_user_model()


class LoginReadSerializer(serializers.ModelSerializer):
    roles = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")
    profile = ListenerProfileSerializer(source='listener_profile', read_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "roles",
            "profile",
        )
