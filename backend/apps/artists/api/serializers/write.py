from rest_framework import serializers

from apps.artists.models import Artist


class ArtistProfileWriteSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(required=False)

    class Meta:
        model = Artist
        fields = ("id", "name", "avatar", "bio")

    def validate_name(self, value):
        if len(value) < 3:
            raise serializers.ValidationError(
                "Слишком короткое имя. Минимальная длина - 3 символа."
            )
        return value
