from rest_framework.exceptions import ValidationError
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if isinstance(exc, ValidationError):
        custom_response_data = {"success": False, "errors": {}}

        for field, messages in response.data.items():
            if isinstance(messages, list):
                custom_response_data["errors"][field] = messages[0]
            else:
                custom_response_data["errors"][field] = messages

        response.data = custom_response_data

    return response
