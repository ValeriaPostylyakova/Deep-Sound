from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


def send_to_moderator(album):
    async_to_sync(get_channel_layer().group_send)(
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


def send_status_album_to_user(user_id, album_id, status, rejection_message=None):
    async_to_sync(get_channel_layer().group_send)(
        f"user_{str(user_id)}",
        {
            "type": "album_status_update",
            "album_id": str(album_id),
            "status": status,
            "rejection_message": rejection_message,
        },
    )
