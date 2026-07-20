from celery import shared_task

from apps.artists.services.websocket import send_track_update_status_to_artist
from apps.authentication.models import User
from apps.content.models import Track
from apps.moderation.api.services.websocket import send_new_track_to_moderator
from common.utils.convert_audio import convert_audio_to_mp3


@shared_task(name="content.process_track")
def process_track(track_id, user_id):
    try:
        track = Track.objects.get(id=track_id)
        user = User.objects.get(id=user_id)

        track.status = "processing"
        track.save(update_fields=["status"])

        send_track_update_status_to_artist(user.id, track.id, "processing")

        mp3_file, duration = convert_audio_to_mp3(track.audio, track.audio.name)

        track.duration = duration
        filename = f"track_{track.id}.mp3"
        track.audio.save(filename, mp3_file)

        track.status = "pending"
        track.save(update_fields=["status", "duration"])

        send_track_update_status_to_artist(user.id, track.id, "pending")
        send_new_track_to_moderator(track)

    except Exception as e:
        if "track" in locals():
            track.status = "error"
            track.rejection_message = str(e)
            track.save()
        raise e
