from django.db import transaction
from django.shortcuts import get_object_or_404


def process_review(model, pk, decision, rejection_message, send_notification_callback):
    obj = get_object_or_404(
        model.objects.only("id", "status", "author_id"), pk=pk
    )

    with transaction.atomic():
        obj.status = decision
        update_fields = ["status", "rejection_message"]

        if decision == "approved":
            obj.rejection_message = None
        else:
            obj.rejection_message = rejection_message

        obj.save(update_fields=update_fields)

        transaction.on_commit(
            lambda: send_notification_callback(obj, decision)
        )

    return obj
