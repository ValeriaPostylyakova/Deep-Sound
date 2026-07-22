from rest_framework import serializers

from apps.artists.models import ArtistProfile
from apps.content.api.albums.serializers.read import AlbumListSerializer
from apps.content.api.tracks.serializers.read import TrackListSerializer
from common.utils.get_image_url import get_image_url


class ArtistProfileStandardSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = ArtistProfile
        fields = (
            "id",
            "name",
            "avatar",
            "is_verified",
            "bio",
        )
        read_only_fields = ("id",)

    def get_avatar(self, obj):
        return get_image_url(obj.avatar, 200)


class ArtistProfileDetailSerializer(ArtistProfileStandardSerializer):
    tracks = serializers.SerializerMethodField()
    albums = serializers.SerializerMethodField()

    class Meta:
        model = ArtistProfile
        fields = ArtistProfileStandardSerializer.Meta.fields + ("tracks", "albums")

    def get_tracks(self, obj):
        tracks = obj.tracks.all()[:5]
        return TrackListSerializer(tracks, many=True, context={'request': self.context['request']}).data

    def get_albums(self, obj):
        albums = obj.albums.all()[:5]
        return AlbumListSerializer(albums, many=True, context={'request': self.context['request']}).data
