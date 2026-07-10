import random

from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage
from django.core.management.base import BaseCommand
from django.db.models.signals import post_save, pre_save
from faker import Faker

from apps.artists.models import Artist
from apps.authentication.models import Role
from apps.music.models import Album, Category, Playlist, Track

User = get_user_model()


class Command(BaseCommand):
    help = "Полное пересоздание и заполнение БД валидными тестовыми данными"

    def handle(self, *args, **kwargs):
        fake = Faker(["ru_RU"])

        local_storage = FileSystemStorage(location="media/test_fixtures/")

        User._meta.get_field("avatar").storage = local_storage
        Album._meta.get_field("image").storage = local_storage
        Track._meta.get_field("image").storage = local_storage
        Track._meta.get_field("audio").storage = local_storage
        Playlist._meta.get_field("image").storage = local_storage

        self.stdout.write("Очистка старых данных...")
        Playlist.objects.all().delete()
        Track.objects.all().delete()
        Album.objects.all().delete()
        Category.objects.all().delete()
        User.objects.all().delete()
        Role.objects.all().delete()
        if hasattr(Artist, "objects"):
            Artist.objects.all().delete()

        self.stdout.write("Создание ролей...")
        role_user, _ = Role.objects.get_or_create(name="user")
        role_artist, _ = Role.objects.get_or_create(name="artist")
        role_mod, _ = Role.objects.get_or_create(name="moderator")

        self.stdout.write("Создание пользователей...")

        dummy_image = ContentFile(
            b"\x47\x49\x46\x38\x39\x61\x01\x00\x01\x00\x80\x00\x00\x00\x00\x00\xff\xff\xff\x21\xf9\x04\x01\x00\x00\x00\x00\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02\x4c\x01\x00\x3b",
            name="dummy.gif",
        )
        dummy_audio = ContentFile(b"ID3dummy-audio-content-stream", name="dummy.mp3")

        admin_user = User.objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="password123",
            first_name="Администратор",
        )
        admin_user.role.add(role_mod)

        users = []
        artists = []

        original_user_save = User.save
        User.save = lambda self, *args, **kwargs: super(User, self).save(
            *args, **kwargs
        )

        for i in range(10):
            user = User.objects.create(
                username=f"user_{i}",
                email=f"user_{i}@example.com",
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                avatar=dummy_image,
            )
            user.set_password("password123")
            user.save()

            if i < 4:
                user.role.add(role_artist)

                artist = Artist.objects.create(user=user, name=f"Artist {fake.name()}")
                artists.append(artist)
            else:
                user.role.add(role_user)
            users.append(user)

        User.save = original_user_save

        self.stdout.write("Создание категорий жанров...")
        genres = ["Поп", "Рок", "Рэп", "Джаз", "Классика", "Электроника"]
        categories = []
        for genre in genres:
            cat = Category.objects.create(name=genre)
            categories.append(cat)

        self.stdout.write("Создание альбомов...")
        albums = []
        status_choices = ["waiting", "processing", "pending", "approved", "published"]

        for artist in artists:
            for _ in range(2):
                album_name = (
                    f"Альбом {fake.word().capitalize()} {random.randint(1, 100)}"
                )
                if not Album.objects.filter(name=album_name, author=artist).exists():
                    album = Album.objects.create(
                        name=album_name,
                        image=dummy_image,
                        author=artist,
                        category=random.choice(categories),
                        status=random.choice(status_choices),
                    )
                    albums.append(album)

        self.stdout.write("Создание треков...")
        tracks = []
        for _ in range(30):
            chosen_album = random.choice(albums + [None, None])
            chosen_author = (
                chosen_album.author if chosen_album else random.choice(artists)
            )
            chosen_category = (
                chosen_album.category if chosen_album else random.choice(categories)
            )

            track = Track.objects.create(
                title=f"Трек {fake.sentence(nb_words=2).replace('.', '')} {random.randint(10, 99)}",
                image=dummy_image,
                audio=dummy_audio,
                duration=random.randint(90, 300),
                status=random.choice(status_choices),
                author=chosen_author,
                category=chosen_category,
                album=chosen_album,
            )
            tracks.append(track)

        self.stdout.write("Создание плейлистов...")
        playlist_status = ["draft", "pending", "approved", "published"]

        for i in range(5):
            is_official = i == 0
            pl_name = (
                f"Лучшее от {fake.city()}" if is_official else f"Мой плейлист {i + 1}"
            )

            playlist = Playlist.objects.create(
                name=pl_name,
                image=dummy_image,
                status=random.choice(playlist_status),
                category=random.choice(categories),
                author=random.choice(users),
                is_official=is_official,
            )
            playlist.tracks.set(random.sample(tracks, k=random.randint(3, 8)))

        self.stdout.write(
            self.style.SUCCESS("=== БД успешно заполнена тестовыми данными! ===")
        )
        self.stdout.write(
            self.style.WARNING("Доступы в админку: admin@example.com / password123")
        )
