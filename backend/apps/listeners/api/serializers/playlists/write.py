from django.core.validators import MinLengthValidator, MaxLengthValidator
from rest_framework import serializers

from apps.content.models import Track
from apps.listeners.models import ListenerPlaylist


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
        model = ListenerPlaylist
        fields = ("id", "name", "image", "tracks",)
        read_only_fields = ("id",)


class ListenerPlaylistWriteSerializer(BasePlaylistWriteSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = BasePlaylistWriteSerializer.Meta.model
        fields = BasePlaylistWriteSerializer.Meta.fields + ("author",)

    validators = [
        serializers.UniqueTogetherValidator(
            queryset=ListenerPlaylist.objects.all(),
            fields=["name", "author"],
            message="Плейлист с таким названием уже существует. Пожалуйста, введите другое название.",
        )
    ]
