from rest_framework import serializers

from buildings.models import Building
from client_rfxs.models import ClientRfx, ClientRfxSchedule, ClientRfxTeam
from services.api.v1.serializers import ServiceByBuildingSerializer


class NewPursuitSerializer(serializers.Serializer):
    clientName = serializers.CharField(max_length=255)
    clientIndustry = serializers.CharField(
        max_length=255, allow_blank=True, required=False)
    generation_of_outsourcing = serializers.CharField(
        max_length=255, allow_blank=True, required=False)
    rfpDeadline = serializers.DateField()
    goLiveDate = serializers.DateField()
    region = serializers.ListField(
        child=serializers.DictField(),
        allow_empty=True
    )
    lead_region = serializers.CharField(max_length=255, allow_blank=True, required=False)
    contract_term = serializers.CharField(max_length=255, allow_blank=True, required=False)
    submittal_phase = serializers.CharField(max_length=255, allow_blank=True, required=False)
    commercial_model = serializers.CharField(max_length=255, allow_blank=True, required=False)

    solutionLead = serializers.CharField(max_length=255, allow_blank=True, required=False)
    commercialLead = serializers.CharField(max_length=255, allow_blank=True, required=False)
    bdmManager = serializers.CharField(max_length=255, allow_blank=True, required=False)
    globalLead = serializers.CharField(max_length=255, allow_blank=True, required=False)
    sourcingLead = serializers.CharField(max_length=255, allow_blank=True, required=False)


class ClientRfxBuildingSerializer(serializers.ModelSerializer):
    services_by_building = ServiceByBuildingSerializer(many=True)

    class Meta:
        model = Building
        fields = "__all__"


class ClientRfxBuildingServiceSerializer(serializers.ModelSerializer):
    buildings = ClientRfxBuildingSerializer(many=True)

    class Meta:
        model = ClientRfx
        fields = "__all__"

    # def get_buildings(self, instance):
    #     return


class ClientRfxSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientRfx
        fields = [
            'id',
            'generation_of_outsourcing',
            'lead_region',
            'type',
            'contract_term',
            'submittal_phase',
            'commercial_model',
            'client',
            'next_milestone',
            'region',
            'team',
            'dates',
            'settings',
            'status',
            'date_created',
            'date_updated',
        ]
        depth = 2


class ClientRfxScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientRfxSchedule
        fields = ['id', 'name', 'client_rfx', 'date', 'activity', 'notes']


class ClientRfxTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientRfxTeam
        fields = ['id', 'name', 'role', 'person', 'region', 'client_rfx']
