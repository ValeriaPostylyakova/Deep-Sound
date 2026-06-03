from django.contrib.auth import get_user_model
from django.core.validators import MaxLengthValidator, MinLengthValidator
from rest_framework import serializers

from apps.music.models import Category, Playlist, Track

User = get_user_model()


class PlaylistUserWriteSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    image = serializers.ImageField(required=False)

    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), required=False
    )
    tracks = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Track.objects.all(),
        required=False,
        allow_empty=True,
        default=[],
    )

    name = serializers.CharField(
        validators=[MinLengthValidator(4), MaxLengthValidator(50)]
    )

    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Playlist
        fields = ("id", "name", "image", "author", "category", "tracks")


class PlaylistArtistWriteSerializer(PlaylistUserWriteSerializer):
    def create(self, validated_data):
        if self.context.get("request").user.is_artist:
            validated_data["type"] = "artist"

        return super().create(validated_data)
