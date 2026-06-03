import json

from channels.generic.websocket import AsyncWebsocketConsumer


class TrackConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]

        if not self.user or self.user.is_anonymous:
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
