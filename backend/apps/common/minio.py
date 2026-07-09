from django.conf import settings
from minio import Minio

client = Minio(
    endpoint=settings.S3_ENDPOINT_URL.replace("http://", "").replace("https://", ""),
    access_key=settings.S3_ACCESS_KEY,
    secret_key=settings.S3_SECRET_KEY,
    secure=settings.S3_USE_SSL,
)
