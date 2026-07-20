from django.core.validators import MaxLengthValidator, MinLengthValidator
from rest_framework import serializers

from apps.content.models import Track
from apps.moderation.models import ModerationPlaylist


class ReviewAlbumAndTrackSerializer(serializers.Serializer):
    decision = serializers.ChoiceField(choices=[("approved", "approved"), ("rejected", "rejected")])
    rejection_message = serializers.CharField(required=True)


class ModerationPlaylistWriteSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    image = serializers.ImageField(required=True)

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
        model = ModerationPlaylist
        fields = ("id", "name", "image", "category", "tracks", 'created_at', "updated_at")
        read_only_fields = ("id", "created_at", "updated_at")
