from rest_framework import viewsets
from apps.music.models import Track

from ..serializers.tracks.read import TrackReadSerializer
from ..serializers.tracks.write import TrackWriteSerializer

from ..tasks import process_audio_track


class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all()

    def get_serializer_class(self):
        if self.request.method in ["PATCH", "POST"]:
            return TrackWriteSerializer
        return TrackReadSerializer

    def perform_create(self, serializer):
        track = serializer.save(status="pending")
        process_audio_track.delay(track.id)
