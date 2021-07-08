from rest_framework import authentication, viewsets, status, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend

from django.db import transaction

from services.models import (
    DeliveryModel, Assumption, ClientService, JLLEstimate,
    ServiceByBuilding, Service, JLLEstimate, SupplierPrice
)
from .serializers import (
    DeliverModelSerializer, AssumptionSerializer,
    ClientServiceSerializer, ServiceByBuildingSerializer, 
    ServiceSerializer, JLLEstimateSerializer, SupplierPriceSerializer
)
from utils.mixins import CreateListMixin

class ServiceAPIView(viewsets.ModelViewSet):
    serializer_class = ServiceSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
        authentication.SessionAuthentication
    )
    permission_classes = [IsAuthenticated, ]
    queryset = Service.objects.all()


class ServiceByBuildingAPIView(viewsets.ModelViewSet):
    serializer_class = ServiceByBuildingSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
        authentication.SessionAuthentication
    )
    permission_classes = [IsAuthenticated, ]
    queryset = ServiceByBuilding.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['building', 'client_service', 'inScope']


class ClientServiceAPIView(viewsets.ModelViewSet):
    serializer_class = ClientServiceSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
        authentication.SessionAuthentication
    )
    permission_classes = [IsAuthenticated, ]
    queryset = ClientService.objects.all()


class AssumptionAPIView(viewsets.ModelViewSet):
    serializer_class = AssumptionSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
        authentication.SessionAuthentication
    )
    permission_classes = [IsAuthenticated, ]
    queryset = Assumption.objects.all()
    filter_backends = [DjangoFilterBackend, ]

    def get_queryset(self):
        queryset = Assumption.objects.all()
        client_service = self.request.query_params.get('client_service')

        filterset = ['value', 'unit', 'name', 'source', 'service_by_building']
        suffix = '__contains'
        filters = {}
        for s in filterset:
            if self.request.query_params.get(s):
                filters[s + suffix] = self.request.query_params.get(s)

        if client_service:
            queryset = queryset.filter(service_by_building__client_service__id=client_service)

        return queryset.filter(**filters)


class DeliverModelAPIView(viewsets.ModelViewSet):
    serializer_class = DeliverModelSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
        authentication.SessionAuthentication
    )
    permission_classes = [IsAuthenticated, ]
    queryset = DeliveryModel.objects.all()


class ServiceMappingAPIView(APIView):
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [IsAuthenticated, ]

    @transaction.atomic()
    def post(self, request, format=None):
        for item in request.data:
            serializer = ServiceByBuildingSerializer(data=item)
            if serializer.is_valid():
                try:
                    serializer.create(serializer.validated_data)
                except:
                    raise serializers.ValidationError('Error validating payload.')
            else:
                raise serializers.ValidationError(serializer.errors)

        return Response(data=serializer.data, status=status.HTTP_204_NO_CONTENT)


class ClientServiceBulkAPIView(APIView):
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [IsAuthenticated, ]

    @transaction.atomic()
    def post(self, request, format=None):
        for item in request.data:
            serializer = ClientServiceSerializer(data=item)
            if serializer.is_valid():
                try:
                    serializer.create(serializer.validated_data)
                except:
                    raise serializers.ValidationError('Error validating payload.')
            else:
                raise serializers.ValidationError(serializer.errors)

        return Response(data=serializer.data, status=status.HTTP_204_NO_CONTENT)

class JLLEstimateViewSet(CreateListMixin, viewsets.ModelViewSet):
    serializer_class = JLLEstimateSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
        authentication.SessionAuthentication
    )
    permission_classes = [IsAuthenticated, ]
    queryset = JLLEstimate.objects.all()

class SupplierPriceViewSet(CreateListMixin, viewsets.ModelViewSet):
    serializer_class = SupplierPriceSerializer
    authentication_classes = (
        authentication.TokenAuthentication,
        authentication.SessionAuthentication
    )
    permission_classes = [IsAuthenticated, ]
    queryset = SupplierPrice.objects.all()