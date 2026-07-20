from rest_framework import serializers

from apps.authentication.models import Role


class GoogleAuthSerializer(serializers.Serializer):
    token = serializers.CharField()
    role = serializers.SlugRelatedField(queryset=Role.objects.all(), slug_field="name", required=True)


class YandexAuthSerializer(serializers.Serializer):
    code = serializers.CharField()
    ole = serializers.SlugRelatedField(queryset=Role.objects.all(), slug_field="name", required=True)
