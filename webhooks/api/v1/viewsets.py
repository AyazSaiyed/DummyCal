from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from webhooks.models import Webhook
from .serializers import WebhookSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

class WebhookViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing webhooks.
    """
    queryset = Webhook.objects.all()
    serializer_class = WebhookSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    ordering_fields = '__all__'
    filterset_fields = [
        'type'
    ]
