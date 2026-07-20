from django.core.validators import MinLengthValidator
from rest_framework import serializers

from apps.artists.models import ArtistProfile
from common.validators import validate_avatar


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
        model = ArtistProfile
        fields = ("id", "name", "avatar", "bio")

    def validate_avatar(self, avatar):
        return validate_avatar(avatar)
