from easy_thumbnails.files import get_thumbnailer


def get_image_url(avatar, size, crop=True):
    if not avatar:
        return None

    return (
        get_thumbnailer(avatar)
        .get_thumbnail(
            {
                "size": (size, size),
                "crop": crop,
            }
        )
        .url
    )
