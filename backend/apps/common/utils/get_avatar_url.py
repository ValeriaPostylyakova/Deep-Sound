from easy_thumbnails.files import get_thumbnailer


def get_avatar_url(obj, size, crop=True):
    if not obj.avatar:
        return None

    return (
        get_thumbnailer(obj.avatar)
        .get_thumbnail(
            {
                "size": (size, size),
                "crop": crop,
            }
        )
        .url
    )
