from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsCaltanaCustomer
from client_rfxs.models import ClientRfx, ClientRfxSchedule, ClientRfxTeam
from .serializers import ClientRfxSerializer, ClientRfxScheduleSerializer, ClientRfxTeamSerializer, \
    NewPursuitSerializer, ClientRfxBuildingServiceSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters, status
from utils.common import CustomSearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.decorators import action
from clients.models import Client, Industry
from django.db import transaction


class ClientRfxBuildingViewSet(viewsets.ModelViewSet):
    queryset = ClientRfx.objects.all()
    serializer_class = ClientRfxBuildingServiceSerializer
    permission_classes = [IsAuthenticated, IsCaltanaCustomer]
    authentication_classes = (TokenAuthentication,)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset()).filter(**kwargs)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ClientRfxViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing client_rfxs.
    """
    queryset = ClientRfx.objects.all()
    serializer_class = ClientRfxSerializer
    permission_classes = [IsAuthenticated, IsCaltanaCustomer]
    authentication_classes = (TokenAuthentication,)
    filter_backends = [DjangoFilterBackend, CustomSearchFilter, filters.OrderingFilter]
    search_fields = ['generation_of_outsourcing', 'contract_term']
    ordering_fields = '__all__'
    filterset_fields = [
        'generation_of_outsourcing', 'lead_region', 'type',
        'contract_term', 'submittal_phase', 'commercial_model',
        'client', 'date_created'
    ]

    @action(detail=False, methods=['post'],
            url_path="new_form", serializer_class=NewPursuitSerializer)
    def new_pursuit(self, request):
        serializer = NewPursuitSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        with transaction.atomic():
            # Client Industry
            clientIndustry = serializer.validated_data.get('clientIndustry', None)
            if clientIndustry:
                clientIndustry, _ = Industry.objects.get_or_create(name=clientIndustry)

            # Client
            client = Client.objects.create(
                name=serializer.validated_data.get('clientName'),
                industry=clientIndustry
            )

            rfx_attributes = [
                "generation_of_outsourcing", "region", "lead_region",
                "contract_term", "submittal_phase", "commercial_model"
            ]

            client_rfx = ClientRfx.objects.create(
                client=client,
                **{_key: serializer.validated_data.get(_key, None) for _key in rfx_attributes}
            )

            # Teams
            teams = [
                ("solutionLead", "Solution Development Lead"),
                ("commercialLead", "Commercial Lead"),
                ("bdmManager", "BDM Manager"),
                ("globalLead", "Global Commercial Lead"),
                ("sourcingLead", "Sourcing Lead"),
            ]
            for team_key, team_role in teams:
                team_value = serializer.validated_data.get(team_key, None)
                if team_value:
                    ClientRfxTeam.objects.create(
                        name=team_value,
                        role=team_role,
                        client_rfx=client_rfx
                    )

            # Dates
            dates = [
                ("rfpDeadline", "RFP Deadline"),
                ("goLiveDate", "Go-Live Date"),
            ]
            for date_key, date_name in dates:
                date_value = serializer.validated_data.get(date_key, None)
                if date_value:
                    ClientRfxSchedule.objects.create(
                        date=date_value,
                        name=date_name,
                        client_rfx=client_rfx
                    )

        return Response({"client_rfx_id": client_rfx.pk}, status=status.HTTP_201_CREATED)


class ClientRfxScheduleViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for viewing and editing client_rfx's dates.
    """
    queryset = ClientRfxSchedule.objects.all()
    serializer_class = ClientRfxScheduleSerializer
    permission_classes = [IsAuthenticated, IsCaltanaCustomer]
    authentication_classes = (TokenAuthentication,)
    filter_backends = [DjangoFilterBackend, CustomSearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'activity']
    ordering_fields = '__all__'
    filterset_fields = ['name', 'client_rfx', 'date', 'activity']

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        if 'data' in kwargs:
            kwargs['data']['client_rfx'] = self.kwargs.get("client_rfx_id")
        return serializer_class(*args, **kwargs)


class ClientRfxTeamViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing client_rfx's team.
    """
    queryset = ClientRfxTeam.objects.all()
    serializer_class = ClientRfxTeamSerializer
    permission_classes = [IsAuthenticated, IsCaltanaCustomer]
    authentication_classes = (TokenAuthentication,)
    filter_backends = [DjangoFilterBackend, CustomSearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'region']
    ordering_fields = '__all__'
    filterset_fields = ['name', 'role', 'person', 'region', 'client_rfx']

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        if 'data' in kwargs:
            kwargs['data']['client_rfx'] = self.kwargs.get("client_rfx_id")
        return serializer_class(*args, **kwargs)
