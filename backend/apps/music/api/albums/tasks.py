from celery import shared_task

from apps.common.utils.convert_audio import convert_audio_to_mp3
from apps.music.models import Track


@shared_task(name="music.proccess_track_to_album")
def proccess_track_to_album(track_id):
    try:
        track = Track.objects.get(id=track_id)

    except Track.DoesNotExist:
        return f"Track {track_id} not found"

    mp3_file, duration = convert_audio_to_mp3(track.audio, track.audio.name)

    track.duration = duration
    filename = f"track_{track.id}.mp3"
    track.audio.save(filename, mp3_file, save=False)
