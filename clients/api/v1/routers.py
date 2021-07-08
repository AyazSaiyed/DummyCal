from rest_framework.routers import SimpleRouter
from .viewsets import ( ClientViewSet, IndustryViewSet )

router = SimpleRouter()
router.register(r"clients", ClientViewSet, basename="clients")
router.register(r"industries", IndustryViewSet, basename="industries")