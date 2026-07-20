from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

channel_layer = get_channel_layer()


def send_track_update_status_to_artist(
        user_id,
        track_id,
        status,
        rejection_message=None,
):
    async_to_sync(channel_layer.group_send)(
        f"user_{str(user_id)}",
        {
            "type": "check_track_status",
            "track_id": str(track_id),
            "status": status,
            "rejection_message": rejection_message,
        },
    )


def send_album_to_moderator(album):
    async_to_sync(channel_layer.group_send)(
        "moderators",
        {
            "type": "new_album_for_moderator",
            "album": {
                "id": str(album.id),
                "image": album.image.url if album.image else None,
                "name": album.name,
                "author": album.author.name,
                "category": album.category.name,
                "tracks": [
                    {
                        "id": str(track.id),
                        "title": track.title,
                        "audio": track.audio.url if track.audio else None,
                        "author": track.author.name,
                        "category": track.category.name,
                    }
                    for track in album.tracks.all()
                ],
            },
        },
    )
