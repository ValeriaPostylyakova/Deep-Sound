from rest_framework import serializers


class PlaylistReadSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
