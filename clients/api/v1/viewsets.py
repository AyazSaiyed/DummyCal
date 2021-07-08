from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from clients.models import Client, Industry
from .serializers import ClientSerializer, IndustrySerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from utils.common import CustomSearchFilter
from django_filters.rest_framework import DjangoFilterBackend

class ClientViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing clients.
    """
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAdminUser]
    authentication_classes = (TokenAuthentication,)
    filter_backends = [DjangoFilterBackend, CustomSearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = '__all__'
    filterset_fields = [
        'name', 'industry'
    ]

class IndustryViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing client's industries.
    """
    queryset = Industry.objects.all()
    serializer_class = IndustrySerializer
    permission_classes = [IsAdminUser]
    authentication_classes = (TokenAuthentication,)
    filter_backends = [DjangoFilterBackend, CustomSearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = '__all__'
    filterset_fields = [
        'name'
    ]