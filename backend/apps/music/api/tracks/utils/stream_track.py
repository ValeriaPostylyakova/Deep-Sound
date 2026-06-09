import io

from django.conf import settings
from ranged_response import RangedFileResponse
from rest_framework import status
from rest_framework.response import Response

minio_client = settings.MINIO_CLIENT


def process_stream_track(request, bucket_name, object_name):
    try:
        stat = minio_client.stat_object(bucket_name, object_name)
    except Exception:
        return Response(
            {"message": "Файл трека не найден."}, status=status.HTTP_404_NOT_FOUND
        )

    try:
        response_data = minio_client.get_object(bucket_name, object_name)

        file_buffer = io.BytesIO(response_data.read())
        response_data.close()
    except Exception as e:
        return Response(
            {"message": f"Ошибка чтения: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    response = RangedFileResponse(request, file_buffer, content_type="audio/mpeg")
    response["Content-Length"] = str(stat.size)

    return response
