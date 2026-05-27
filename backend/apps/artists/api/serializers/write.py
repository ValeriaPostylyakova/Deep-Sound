from django.core.validators import MinLengthValidator
from rest_framework import serializers

from apps.artists.models import Artist
from apps.common.validators import validate_avatar


class ArtistProfileWriteSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(required=False)
    name = serializers.CharField(
        validators=[
            MinLengthValidator(
                4, message="Слишком короткое имя. Минимальная длина 4 символа."
            )
        ],
    )

    class Meta:
        model = Artist
        fields = ("id", "name", "avatar", "bio")

    def validate_avatar(self, avatar):
        return validate_avatar(avatar)


class BecomeArtistWriteSerializer(serializers.ModelSerializer):
    name = serializers.CharField()

    class Meta:
        model = Artist
        fields = ("name",)

    def create(self, validated_data):
        user = self.context.get("request").user
        return Artist.objects.create(user=user, name=validated_data["name"])
