import os
import tempfile

from django.core.files.base import ContentFile
from pydub import AudioSegment


def convert_audio_to_mp3(file_object, original_name):
    orig_ext = os.path.splitext(original_name)[1].replace(".", "").lower()

    with tempfile.NamedTemporaryFile(suffix=f".{orig_ext}", delete=False) as temp_orig:
        temp_orig.write(file_object.read())
        temp_orig_path = temp_orig.name

    temp_out_path = temp_orig_path + "_converted.mp3"

    try:
        audio = AudioSegment.from_file(temp_orig_path, format=orig_ext)
        audio.export(temp_out_path, format="mp3", bitrate="192k")
        duration = audio.duration_seconds

        with open(temp_out_path, "rb") as f:
            content_file = ContentFile(f.read())

        return content_file, duration

    finally:
        if os.path.exists(temp_orig_path):
            os.remove(temp_orig_path)
        if os.path.exists(temp_out_path):
            os.remove(temp_out_path)
