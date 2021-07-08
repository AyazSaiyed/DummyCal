from rest_framework import serializers

from core.utils import update_object
from core.serializers import ReadWriteSerializerMethodField
from services.models import (
    DeliveryModel, Assumption, ClientService, JLLEstimate,
    ServiceByBuilding, Service, SupplierPrice
)
from client_rfxs.models import ClientRfx
from django.db import transaction


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"


class AssumptionSerializer(serializers.ModelSerializer):
    client_service = serializers.SerializerMethodField()

    class Meta:
        model = Assumption
        fields = "__all__"

    def get_client_service(self, instance):
        if hasattr(instance, 'service_by_building'):
            return {
                'id': instance.service_by_building.id,
                'client_service': instance.service_by_building.client_service.service_name
            }
        return {}

    def get_source(self, instance):
        if instance.source:
            source = instance.source
            return {
                "id": source.id,
                "name": source.name,
            }
        return {}


class ServiceByBuildingSerializer(serializers.ModelSerializer):
    deliveryModel = ReadWriteSerializerMethodField(required=False)
    assumptions = AssumptionSerializer(many=True, required=False)
    _client_service = serializers.SerializerMethodField()

    class Meta:
        model = ServiceByBuilding
        fields = "__all__"

    def get__client_service(self, instance):
        if hasattr(instance, 'client_service'):
            return {
                'id': instance.client_service.id,
                'name': instance.client_service.service_name
            }

    def get_deliveryModel(self, instance):
        if hasattr(instance, 'deliveryModel'):
            model = instance.deliveryModel

            return {
                "id": model.pk,
                "name": model.name
            } if model else {}
        return {}

    def update(self, instance, validated_data):

        deliveryModel_id = validated_data.pop('deliveryModel') if validated_data.get('deliveryModel') else None
        if deliveryModel_id:
            if not DeliveryModel.objects.filter(pk=deliveryModel_id).exists():
                raise serializers.ValidationError('deliveryModel does not exist')
            validated_data['deliveryModel_id'] = deliveryModel_id
        return update_object(instance, validated_data)

    def create(self, validated_data):
        deliveryModel_id = validated_data.pop('deliveryModel') if validated_data.get('deliveryModel') else None
        if deliveryModel_id:
            if not DeliveryModel.objects.filter(pk=deliveryModel_id).exists():
                raise serializers.ValidationError('deliveryModel does not exist')
            validated_data['deliveryModel_id'] = deliveryModel_id
        return update_object(ServiceByBuilding(), validated_data)


class ClientServiceSerializer(serializers.ModelSerializer):
    services = ReadWriteSerializerMethodField()
    client = serializers.SerializerMethodField()

    class Meta:
        model = ClientService
        fields = "__all__"

    def get_services(self, instance):
        try:
            return [{"id": i.id, "value": i.value} for i in instance.services.all()]
        except:
            return []

    def get_client(self, instance):
        try:
            client = instance.client_rfx
            return {
                'id': client.id,
                'name': client.client.name,
                'region': client.region
            }
        except:
            return {}

    def update(self, instance, validated_data):
        services = validated_data.pop('services')
        instance.services.clear()
        for service in services:
            instance.services.add(service)
        return update_object(instance, validated_data)

    def create(self, validated_data):
        services = validated_data.pop('services')
        instance = update_object(ClientService(), validated_data)
        for service in services:
            instance.services.add(service)
        return instance


class DeliverModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryModel
        fields = "__all__"


class NewServiceSerializer(serializers.Serializer):
    service_name = serializers.CharField(max_length=255)
    services = serializers.JSONField()
    client_rfx = serializers.IntegerField()
    note_created = serializers.CharField(max_length=255, required=False, allow_blank=True)

    @transaction.atomic()
    def create(self, validated_data):
        client_rfx = ClientRfx.objects.filter(pk=validated_data['client_rfx']).first()
        if not client_rfx:
            raise serializers.ValidationError("client_rfx is invalid")

        client_service = ClientService.objects.create(
            service_name=validated_data['service_name'],
            client_rfx=client_rfx,
            note_created=validated_data.get('note_created', None)
        )
        services = Service.objects.bulk_create([Service(**item) for item in validated_data['services']])
        client_service.services.add(*services)
        return client_service

class JLLEstimateSerializer(serializers.ModelSerializer):
    class Meta:
        model = JLLEstimate
        fields = "__all__"

class SupplierPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupplierPrice
        fields = "__all__"