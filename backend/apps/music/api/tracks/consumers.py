import json

from channels.generic.websocket import AsyncWebsocketConsumer


class TrackConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        self.track_id = self.scope["url_route"]["kwargs"]["track_id"]
        self.group_name = f"track_{self.track_id}"

        await self.channel_layer.group_add(self.group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):

        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def track_status_update(self, event):
        status = event["status"]

        await self.send(text_data=json.dumps({"status": status}))
