import re
import secrets


def generate_username_from_email(email):
    base = email.split("@")[0].lower()
    base = re.sub(r"[^a-z0-9]", "", base)
    base = base if base else "user"

    random_suffix = secrets.randbelow(9000) + 1000
    return f"{base}_{random_suffix}"
