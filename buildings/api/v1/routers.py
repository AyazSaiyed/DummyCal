from rest_framework.routers import SimpleRouter
from .viewsets import ( BuildingViewSet, BuildingTypeViewSet )

router = SimpleRouter()
router.register(r"buildings", BuildingViewSet, basename="buildings")
router.register(r"building_types", BuildingTypeViewSet, basename="building_types")