from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class LoginReadSerializer(serializers.ModelSerializer):
    role = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "avatar",
            "role",
        )
