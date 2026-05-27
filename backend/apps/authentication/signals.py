from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Role

User = get_user_model()


@receiver(post_save, sender=User)
def assign_default_role(sender, instance, created, **kwargs):
    if created:
        user_role, _ = Role.objects.get_or_create(name="user")
        instance.role.add(user_role)
