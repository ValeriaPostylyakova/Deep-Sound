from rest_framework import serializers


class ReviewAlbumAndTrackSerializer(serializers.Serializer):
    decision = serializers.ChoiceField(choices=[("approved", "approved"), ("rejected", "rejected")])
    rejection_message = serializers.CharField(required=True)
