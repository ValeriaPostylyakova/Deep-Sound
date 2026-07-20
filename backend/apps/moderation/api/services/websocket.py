from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

channel_layer = get_channel_layer()


def send_status_album_to_artist(user_id, album_id, status, rejection_message=None):
    async_to_sync(channel_layer.group_send)(
        f"user_{str(user_id)}",
        {
            "type": "check_album_status",
            "album_id": str(album_id),
            "status": status,
            "rejection_message": rejection_message,
        },
    )


def send_new_track_to_moderator(track):
    async_to_sync(channel_layer.group_send)(
        "moderators",
        {
            "type": "new_track_for_moderator",
            "track": {
                "id": str(track.id),
                "title": track.title,
                "audio": track.audio.url if track.audio else None,
                "author": track.author.name,
                "category": track.category.name,
            },
        },
    )
