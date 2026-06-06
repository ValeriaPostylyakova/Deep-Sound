from django.contrib.auth import get_user_model
from django.core.validators import MaxLengthValidator, MinLengthValidator
from rest_framework import serializers

from apps.music.models import Category, Playlist, Track

User = get_user_model()


class BasePlaylistWriteSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    image = serializers.ImageField(required=False)

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

    class Meta:
        model = Playlist
        fields = ("id", "name", "image", "tracks")
        read_only_fields = ("id",)


class PlaylistUserWriteSerializer(BasePlaylistWriteSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        fields = BasePlaylistWriteSerializer.Meta.fields + ("author",)


class PlaylistModeratorWriteSerializer(BasePlaylistWriteSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), required=False
    )

    is_official = serializers.BooleanField(default=True)

    class Meta:
        fields = BasePlaylistWriteSerializer.Meta.fields + ("category", "is_official")
