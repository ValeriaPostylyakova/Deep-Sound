import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models

from apps.common.utils.optimize_image import optimize_image


class Role(models.Model):
    ROLE_NAME_CHOICES = [
        ("user", "Пользователь"),
        ("artist", "Исполнитель"),
        ("modarator", "Модератор"),
    ]

    name = models.CharField(max_length=20, unique=True, choices=ROLE_NAME_CHOICES)

    def __str__(self):
        return self.name


class User(AbstractUser):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
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
        if self.avatar and hasattr(self.avatar, "file"):
            optimize_image(self)
        super().save(*args, **kwargs)

    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    @property
    def is_moderator(self):
        return self.role.filter(name="modarator").exists()

    @property
    def is_artist(self):
        return self.role.filter(name="artist").exists()

    @property
    def is_user(self):
        return self.role.filter(name="user").exists()
