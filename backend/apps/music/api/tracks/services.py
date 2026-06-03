from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

channel_layer = get_channel_layer()


def send_track_update_to_user(
    user_id,
    track_id,
    status,
    rejection_message=None,
):

    print(
        f"--- ОТПРАВКА В СОКЕТ ДЛЯ ГРУППЫ: user_{str(user_id)} со статусом {status} ---"
    )

    async_to_sync(channel_layer.group_send)(
        f"user_{str(user_id)}",
        {
            "type": "track_status_update",
            "track_id": str(track_id),
            "status": status,
            "rejection_message": rejection_message,
        },
    )
