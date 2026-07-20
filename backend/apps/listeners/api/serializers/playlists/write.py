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
        fields = ("id", "name", "image", "tracks", 'is_official')
        read_only_fields = ("id", 'is_official')


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
