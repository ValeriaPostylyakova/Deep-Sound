import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models


class Role(models.Model):
    ROLE_NAME_CHOICES = [
        ("listener", "Слушатель"),
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

    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    roles = models.ManyToManyField('Role', related_name="users")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email

    @property
    def is_moderator(self):
        return self.roles.filter(name="moderator").exists()

    @property
    def is_artist(self):
        return self.roles.filter(name="artist").exists()

    @property
    def is_listener(self):
        return self.roles.filter(name="listener").exists()


class SocialAccount(models.Model):
    PROVIDERS = (
        ("google", "Google"),
        ("yandex", "Yandex"),
    )

    user = models.ForeignKey(
        'User',
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
