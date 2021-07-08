from .api.v1.serializers import NewServiceSerializer

def create_services_from_list(client_rfx, services, note_created=None):
    parsed_services = []
    for service in services:
        service["client_rfx"] = client_rfx
        service["note_created"] = note_created
        parsed_services.append(service)

    serializer = NewServiceSerializer(data=parsed_services, many=True)
    if serializer.is_valid(raise_exception=True):
        serializer.save()