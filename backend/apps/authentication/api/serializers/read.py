from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserLoginReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name", "avatar")


class UserReadSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "username",
            "full_name",
            "avatar",
            "is_active",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")

    def get_full_name(self, obj):
        return obj.get_full_name
