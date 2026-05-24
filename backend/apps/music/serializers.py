from rest_framework import serializers

from .models import Category, Playlist, Track


class CetegoryReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("name", "slug", "created_at", "updated_at")
        read_only_fields = ("created_at", "updated_at")


class TrackReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = "__all__"


class PlaylistReadSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField(required=False)
    author = serializers.StringRelatedField()
    tracks = TrackReadSerializer(many=True)
    rejection_message = serializers.CharField(required=False)

    class Meta:
        model = Playlist
        fields = (
            "id",
            "name",
            "image",
            "status",
            "rejection_message",
            "category",
            "author",
            "tracks",
            "type",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")


class PlaylistWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = ("name", "image", "status", "rejection_message", "category")

    def create(self, validated_data):
        user = self.context.get("request").user

        if user and user.role == "artist":
            validated_data.update(
                {"author": user.artist, "type": "artist", "is_official": True}
            )

        return super().create(validated_data)
