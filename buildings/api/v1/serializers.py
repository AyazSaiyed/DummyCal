from buildings.models import Building, BuildingType
from rest_framework import serializers
from buildings.models import Building
from utils.common import validateJSON


# from services.api.v1.serializers import ServiceByBuildingSerializer

class BuildingSerializer(serializers.ModelSerializer):
    # services_by_building = ServiceByBuildingSerializer(many=True)
    buildingType = serializers.SerializerMethodField()

    class Meta:
        model = Building
        fields = [
            'id',
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
            'days_operation',
            'hours_operation',
            'worker_shifts',
            'note_created',
            'buildingType'
        ]

    def get_buildingType(self, instance):
        if hasattr(instance, 'building_type'):
            return {
                'id': instance.building_type.id,
                'building_type': instance.building_type.building_type,
                'sqft_per_person': instance.building_type.sqft_per_person
            }
        return {}

    def validate_days_operation(self, value):
        """
        Check that the valid list
        """
        result = []

        if value:
            if isinstance(value, str):
                parsed_value = validateJSON(value)
                if parsed_value is False:
                    value = value.split(',')
                else:
                    value = parsed_value

            if not isinstance(value, list):
                raise serializers.ValidationError(value)
            elif isinstance(value, list):
                for it in value:
                    it = it.strip().capitalize()
                    if it not in ['Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday', 'Sunday']:
                        raise serializers.ValidationError(f"Hours operation invalid value: {it}")
                    result.append(it)

        return result or []

    def validate_hours_operation(self, value):
        """
        Check that the valid list
        """
        result = []

        if value:
            if isinstance(value, str):
                parsed_value = validateJSON(value)
                if parsed_value is False:
                    value = value.split(',')
                else:
                    value = parsed_value

            if not isinstance(value, list):
                raise serializers.ValidationError("Hours operation is wrong")
            elif isinstance(value, list):
                for it in value:
                    it = it.strip().lower()
                    if it not in ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am",
                                  "12am", "1pm",
                                  "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"]:
                        raise serializers.ValidationError(f"Hours operation invalid value: {it}")
                    result.append(it)

        return result


class BuildingTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildingType
        fields = [
            'id',
            'building_type',
            'sqft_per_person'
        ]
