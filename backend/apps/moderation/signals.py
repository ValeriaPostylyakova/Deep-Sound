from django.db import transaction
from django.db.models.signals import post_save
from django.dispatch import receiver

from apps.music.api.albums.services import send_to_moderator, send_status_album_to_user
from apps.music.models import Album


@receiver(post_save, sender=Album)
def handle_album_status_change(sender, instance, **kwargs):
    update_fields = kwargs.get("update_fields")

    if update_fields and "status" in update_fields and instance.status == "pending":
        user_id = str(instance.author.user_id)
        album_id = str(instance.id)

        transaction.on_commit(lambda: send_to_moderator(instance))
        transaction.on_commit(
            lambda: send_status_album_to_user(
                user_id, album_id, "pending"
            )
        )
