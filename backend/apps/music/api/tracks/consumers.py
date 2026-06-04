import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer


class TrackConsumer(AsyncWebsocketConsumer):
    @database_sync_to_async
    def check_is_artist(self, user):
        if not user or user.is_anonymous:
            return False

        return user.role.filter(name="artist").exists()

    async def connect(self):
        self.user = self.scope.get("user")

        is_artist = await self.check_is_artist(self.user)

        if not is_artist:
            await self.close()
            return

        self.group_name = f"user_{str(self.user.id)}"

        await self.channel_layer.group_add(self.group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        if hasattr(self, "group_name"):
            await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def track_status_update(self, event):
        await self.send(
            text_data=json.dumps(
                {
                    "type": "track_status_update",
                    "track_id": event["track_id"],
                    "status": event["status"],
                    "rejection_message": event.get("rejection_message"),
                }
            )
        )

    async def album_status_update(self, event):
        await self.send(
            text_data=json.dumps(
                {
                    "type": "album_status_update",
                    "album_id": event["album_id"],
                    "status": event["status"],
                    "rejection_message": event.get("rejection_message"),
                }
            )
        )


class ModeratorConsumer(AsyncWebsocketConsumer):
    @database_sync_to_async
    def check_is_moderator(self, user):
        if not user or user.is_anonymous:
            return False

        return user.role.filter(name="moderator").exists()

    async def connect(self):
        self.user = self.scope.get("user")

        is_mod = await self.check_is_moderator(self.user)

        if not is_mod:
            await self.close()
            return

        self.group_name = "moderators"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        if hasattr(self, "group_name"):
            await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def new_track_for_moderator(self, event):
        await self.send(
            text_data=json.dumps(
                {
                    "type": "new_track_for_moderator",
                    "track": event["track"],
                }
            )
        )

    async def new_album_for_moderator(self, event):
        await self.send(
            text_data=json.dumps(
                {
                    "type": "new_album_for_moderator",
                    "album": event["album"],
                }
            )
        )
