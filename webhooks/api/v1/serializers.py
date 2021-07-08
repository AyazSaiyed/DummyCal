
from rest_framework import serializers
from webhooks.models import Webhook

class WebhookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Webhook
        fields = ['id', 'type', 'token', 'metadata', 'date_created']
        read_only_fields = ['date_created', 'token']