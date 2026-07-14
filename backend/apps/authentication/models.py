import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models

from common.utils.optimize_image import optimize_image


class Role(models.Model):
    ROLE_NAME_CHOICES = [
        ("user", "Пользователь"),
        ("artist", "Исполнитель"),
        ("moderator", "Модератор"),
    ]

    name = models.CharField(max_length=20, unique=True, choices=ROLE_NAME_CHOICES)

    def __str__(self):
        return self.name


class User(AbstractUser):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    avatar = models.ImageField(upload_to="avatars/users/", null=True, blank=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    role = models.ManyToManyField(Role, related_name="users", default="user")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        update_fields = kwargs.get("update_fields") or []

        if "last_login" not in update_fields and self.avatar:
            optimize_image(self)

        super().save(*args, **kwargs)

    @property
    def is_moderator(self):
        return self.role.filter(name="moderator").exists()

    @property
    def is_artist(self):
        return self.role.filter(name="artist").exists()

    @property
    def is_user(self):
        return self.role.filter(name="user").exists()


class SocialAccount(models.Model):
    PROVIDERS = (
        ("google", "Google"),
        ("yandex", "Yandex"),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="social_accounts",
    )

    provider = models.CharField(max_length=20, choices=PROVIDERS)
    provider_id = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["provider", "provider_id"],
                name="unique_provider_account",
            )
        ]
