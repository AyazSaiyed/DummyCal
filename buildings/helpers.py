from .models import Building
from .api.v1.serializers import BuildingSerializer

def create_buildings_from_list(client_rfx, buildings, note_created=None):
    parsed_buildings = []
    for building in buildings:
        building['client_rfx'] = client_rfx
        building['note_created'] = note_created
        parsed_buildings.append(building)

    serializer = BuildingSerializer(data=parsed_buildings, many=True)
    if serializer.is_valid(raise_exception=True):
        serializer.save()