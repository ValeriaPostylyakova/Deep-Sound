from django.apps import AppConfig


class ModerationConfig(AppConfig):
    name = "apps.moderation"
    default_auto_field = "django.db.models.BigAutoField"

    def ready(self):
        import apps.moderation.signals  # noqa
