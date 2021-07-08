from .models import ClientRfx
from .api.v1.serializers import ClientRfxSerializer

def create_client_rfxs_from_list(crfxs, note_created=None):
    insts = []
    for crfx in crfxs:
        serializer = ClientRfxSerializer(data=crfx)
        if serializer.is_valid():
            obj = ClientRfx(note_created=note_created, **serializer.validated_data)
            insts.append(obj)

    if len(insts) > 0:
        ClientRfx.bulk_create(insts)

    return len(insts)