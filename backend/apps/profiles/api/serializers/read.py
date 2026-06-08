from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.common.utils.get_image_url import get_image_url

User = get_user_model()


class ProfileShortSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    role = serializers.SlugRelatedField(many=True, slug_field="name", read_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "avatar",
            "role",
        )
        read_only_fields = ("id",)

    def get_avatar(self, obj):
        return get_image_url(obj.avatar, 50)


class ProfileStandardSerializer(ProfileShortSerializer):
    class Meta(ProfileShortSerializer.Meta):
        fields = ProfileShortSerializer.Meta.fields + ('created_at',)
        read_only_fields = ProfileShortSerializer.Meta.read_only_fields + ('created_at',)

    def get_avatar(self, obj):
        return get_image_url(obj.avatar, 150)


class ProfileDetailSerializer(ProfileStandardSerializer):
    class Meta(ProfileStandardSerializer.Meta):
        fields = ProfileShortSerializer.Meta.fields + ('email',)
        read_only_fields = ProfileShortSerializer.Meta.read_only_fields + ('email',)

    def get_avatar(self, obj):
        return get_image_url(obj.avatar, 100)
