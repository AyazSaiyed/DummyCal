from rest_framework.routers import SimpleRouter
from .viewsets import ( SupplierViewSet )

router = SimpleRouter()
router.register(r"suppliers", SupplierViewSet, basename="suppliers")