from django.db import transaction
from django.db.models.signals import post_save
from django.dispatch import receiver

from apps.artists.services import send_album_to_moderator
from apps.content.models import Album
from apps.moderation.api.services.websocket import send_status_album_to_artist


@receiver(post_save, sender=Album)
def handle_album_status_change(sender, instance, **kwargs):
    update_fields = kwargs.get("update_fields")

    if update_fields and "status" in update_fields and instance.status == "pending":
        user_id = str(instance.author.user_id)
        album_id = str(instance.id)

        transaction.on_commit(lambda: send_album_to_moderator(instance))
        transaction.on_commit(
            lambda: send_status_album_to_artist(
                user_id, album_id, "pending"
            )
        )
