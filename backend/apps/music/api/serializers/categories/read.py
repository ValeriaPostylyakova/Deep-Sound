from rest_framework import serializers

from apps.music.models import Category


class CetegoryReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("name", "slug", "created_at", "updated_at")
        read_only_fields = ("created_at", "updated_at")
