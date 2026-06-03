from rest_framework import viewsets

from apps.music.models import Track

from .tasks import process_audio_track
from .serializers.read import TrackReadSerializer
from .serializers.write import TrackWriteSerializer


class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all()

    def get_serializer_class(self):
        if self.request.method in ["PATCH", "POST"]:
            return TrackWriteSerializer
        return TrackReadSerializer

    def perform_create(self, serializer):
        track = serializer.save(status="waiting")
        process_audio_track.delay(track.id)
