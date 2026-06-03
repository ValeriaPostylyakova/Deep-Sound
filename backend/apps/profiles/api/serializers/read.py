from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.common.utils.get_image_url import get_image_url
from apps.music.api.playlists.serializers.read import PlaylistReadSerializer

User = get_user_model()


class ProfileReadSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    avatar_small = serializers.SerializerMethodField()
    avatar_medium = serializers.SerializerMethodField()
    avatar_large = serializers.SerializerMethodField()

    playlists = serializers.SerializerMethodField()

    role = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "username",
            "full_name",
            "avatar_small",
            "avatar_medium",
            "avatar_large",
            "is_active",
            "role",
            "playlists",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")

    def get_full_name(self, obj):
        return obj.get_full_name

    def get_avatar_small(self, obj):
        return get_image_url(obj.avatar, 64)

    def get_avatar_medium(self, obj):
        return get_image_url(obj.avatar, 128)

    def get_avatar_large(self, obj):

        return get_image_url(obj.avatar, 256)

    def get_playlists(self, obj):
        filtered_playlists = obj.playlists.filter(type="user").order_by("-created_at")[
            :3
        ]

        return PlaylistReadSerializer(filtered_playlists, many=True).data
