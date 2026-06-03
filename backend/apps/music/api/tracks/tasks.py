import os
import tempfile

from celery import shared_task
from django.core.files.base import ContentFile
from pydub import AudioSegment

from apps.music.models import Track


@shared_task
def process_audio_track(track_id):
    try:
        track = Track.objects.get(id=track_id)
        track.status = "processing"
        track.save()
        orig_ext = os.path.splitext(track.audio.name)[1].replace(".", "").lower()

        with tempfile.NamedTemporaryFile(
            suffix=f".{orig_ext}", delete=False
        ) as temp_orig:
            temp_orig.write(track.audio.read())
            temp_orig_path = temp_orig.name

        temp_out_path = temp_orig_path + "_converted.mp3"

        audio = AudioSegment.from_file(temp_orig_path, format=orig_ext)

        audio.export(temp_out_path, format="mp3", bitrate="192k")

        track.duration = audio.duration_seconds

        with open(temp_out_path, "rb") as f:
            filename = f"track_{track.id}.mp3"
            track.audio.save(filename, ContentFile(f.read()), save=False)

        track.status = "pending"
        track.save()

        os.remove(temp_orig_path)
        os.remove(temp_out_path)

    except Exception as e:
        if "track" in locals():
            track.status = "error"
            track.rejection_message = str(e)
            track.save()
        raise e
