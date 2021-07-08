from rest_framework.routers import SimpleRouter
from .viewsets import ( WebhookViewSet )

router = SimpleRouter()
router.register(r"webhooks", WebhookViewSet, basename="webhooks")