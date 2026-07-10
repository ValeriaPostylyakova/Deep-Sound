import os


def get_env_bool(key, default=False):
    value = os.getenv(key, str(default)).lower()
    return value in ("true", "1", "yes", "on")
