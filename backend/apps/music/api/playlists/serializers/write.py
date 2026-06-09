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
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Playlist
        fields = BasePlaylistWriteSerializer.Meta.fields + ("author",)

    validators = [
        serializers.UniqueTogetherValidator(
            queryset=Playlist.objects.all(),
            fields=["name", "is_official", "author"],
            message="Плейлист с таким названием уже существует. Пожалуйста, введите другое название.",
        )
    ]


class PlaylistModeratorWriteSerializer(PlaylistUserWriteSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), required=False
    )

    is_official = serializers.BooleanField(default=True)

    class Meta(PlaylistUserWriteSerializer.Meta):
        fields = PlaylistUserWriteSerializer.Meta.fields + ("category", "is_official")
