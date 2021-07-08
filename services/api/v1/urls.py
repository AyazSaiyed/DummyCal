from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .viewsets import (
    DeliverModelAPIView, AssumptionAPIView, ClientServiceAPIView,
    ServiceByBuildingAPIView, ServiceMappingAPIView, ServiceAPIView,
    ClientServiceBulkAPIView, JLLEstimateViewSet, SupplierPriceViewSet
)
from ...views import viewAndExportData

router = DefaultRouter()
router.register('delivery', DeliverModelAPIView)
router.register('assumption', AssumptionAPIView)
router.register('client-service', ClientServiceAPIView)
router.register('service-by-building', ServiceByBuildingAPIView)
router.register('service', ServiceAPIView)
router.register('estimates', JLLEstimateViewSet)
router.register('supplier-prices', SupplierPriceViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path('service-mapping', ServiceMappingAPIView.as_view()),
    path('client-service-bulk/', ClientServiceBulkAPIView.as_view()),
    path("viewAndExportData/<int:client_id>", viewAndExportData,name="viewAndExportData"),

]


