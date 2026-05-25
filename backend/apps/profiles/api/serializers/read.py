from django.contrib.auth import get_user_model
from easy_thumbnails.files import get_thumbnailer
from rest_framework import serializers

User = get_user_model()


class ProfileReadSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    avatar_small = serializers.SerializerMethodField()
    avatar_medium = serializers.SerializerMethodField()
    avatar_large = serializers.SerializerMethodField()

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
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")

    def get_full_name(self, obj):
        return obj.get_full_name

    def get_avatar_small(self, obj):
        if not obj.avatar:
            return None

        return (
            get_thumbnailer(obj.avatar)
            .get_thumbnail(
                {
                    "size": (64, 64),
                    "crop": True,
                }
            )
            .url
        )

    def get_avatar_medium(self, obj):
        if not obj.avatar:
            return None

        return (
            get_thumbnailer(obj.avatar)
            .get_thumbnail(
                {
                    "size": (128, 128),
                    "crop": True,
                }
            )
            .url
        )

    def get_avatar_large(self, obj):
        if not obj.avatar:
            return None

        return (
            get_thumbnailer(obj.avatar)
            .get_thumbnail(
                {
                    "size": (256, 256),
                    "crop": True,
                }
            )
            .url
        )
