from django.contrib.auth import get_user_model
from django.db import transaction

from apps.artists.models import ArtistProfile
from apps.authentication.models import SocialAccount, Role
from apps.authentication.services.generate_tokens import generate_tokens
from apps.listeners.models import ListenerProfile

User = get_user_model()


class SocialAuthService:
    @staticmethod
    @transaction.atomic
    def authenticate_social_user(provider, provider_id, email, requested_role):
        social = SocialAccount.objects.select_related("user").filter(
            provider=provider,
            provider_id=provider_id,
        ).first()

        if social:
            user = social.user
        else:
            user = User.objects.filter(email=email).first()

            if not user:
                user = User.objects.create_user(email=email, username=email)
                user.set_unusable_password()
                user.is_active = True
                user.is_verified = True
                user.save()

                listener_role, _ = Role.objects.get_or_create(name="listener")
                user.roles.add(listener_role)
                ListenerProfile.objects.create(user=user)

                SocialAccount.objects.create(
                    user=user,
                    provider=provider,
                    provider_id=provider_id,
                )

                if requested_role == "artist":
                    artist_role, _ = Role.objects.get_or_create(name="artist")
                    user.roles.add(artist_role)
                    ArtistProfile.objects.create(user=user)
            else:
                if requested_role == "artist" and not user.is_artist:
                    artist_role, _ = Role.objects.get_or_create(name="artist")
                    user.roles.add(artist_role)
                    ArtistProfile.objects.get_or_create(user=user)

                SocialAccount.objects.get_or_create(
                    user=user,
                    provider=provider,
                    provider_id=provider_id,
                )

        return generate_tokens(user, f"Авторизация через {provider.capitalize()} успешна")
