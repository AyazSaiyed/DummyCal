from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from services.api.v1.serializers import ServiceByBuildingSerializer
from users.permissions import IsCaltanaCustomer
from buildings.models import Building, BuildingType
from .serializers import BuildingSerializer, BuildingTypeSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from utils.common import CustomSearchFilter
from django_filters.rest_framework import DjangoFilterBackend
# from rest_framework.response import Response
# from rest_framework.decorators import action
# from django.db import transaction
from utils.mixins import CreateListMixin

class BuildingViewSet(CreateListMixin, viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing buildings.
    """
    queryset = Building.objects.all()
    serializer_class = BuildingSerializer
    permission_classes = [IsAuthenticated, IsCaltanaCustomer]
    authentication_classes = (TokenAuthentication,)
    filter_backends = [DjangoFilterBackend, CustomSearchFilter, filters.OrderingFilter]
    search_fields = ['site_id']
    ordering_fields = '__all__'
    filterset_fields = [
        'client_rfx',
        'building_type',
        'main_region',
        'sub_region',
        'country',
        'state',
        'city',
        'site_id', 
        'floor',
        'floor_sub_area',
        'building_area_type',
        'ownership_type',
        'lease_type',
        'headcount',
        'gross_floor_area',
        'gross_floor_area_units',
        'green_area',
        'green_area_units',
        'service_level',
        'go_live_date',
        'scope_pursuit',
        # 'days_operation',
        # 'hours_operation',
        'worker_shifts',
    ]


class BuildingTypeViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing buildings.
    """
    queryset = BuildingType.objects.all()
    serializer_class = BuildingTypeSerializer
    permission_classes = [IsAuthenticated, IsCaltanaCustomer]
    authentication_classes = (TokenAuthentication,)
    filter_backends = [DjangoFilterBackend, CustomSearchFilter, filters.OrderingFilter]
    search_fields = ['building_type']
    ordering_fields = '__all__'
    filterset_fields = ['building_type', 'sqft_per_person']
