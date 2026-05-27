from rest_framework import serializers

from apps.music.models import Track


class TrackReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = "__all__"
