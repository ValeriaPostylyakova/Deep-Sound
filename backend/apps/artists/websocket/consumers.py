import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer


class ArtistContentConsumer(AsyncWebsocketConsumer):
    @database_sync_to_async
    def check_is_role_artist(self, user):
        if not user or user.is_anonymous:
            return False

        return user.roles.filter(name="artist").exists()

    async def connect(self):
        self.user = self.scope.get("user")

        is_artist = await self.check_is_role_artist(self.user)

        if not is_artist:
            await self.close()
            return

        self.group_name = f"user_{str(self.user.id)}"

        await self.channel_layer.group_add(self.group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        if hasattr(self, "group_name"):
            await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def check_track_status(self, event):
        await self.send(
            text_data=json.dumps(
                {
                    "type": "check_track_status",
                    "track_id": event["track_id"],
                    "status": event["status"],
                    "rejection_message": event.get("rejection_message"),
                }
            )
        )

    async def check_album_status(self, event):
        await self.send(
            text_data=json.dumps(
                {
                    "type": "check_album_status",
                    "album_id": event["album_id"],
                    "status": event["status"],
                    "rejection_message": event.get("rejection_message"),
                }
            )
        )
