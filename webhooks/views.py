from webhooks.models import Webhook
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Webhook
from client_rfxs.helpers import create_client_rfxs_from_list
from buildings.helpers import create_buildings_from_list
from services.helpers import create_services_from_list
from logs.models import Log

# Create your views here.
class FlatFileWebhook(APIView):
    permission_classes = (AllowAny,)

    def post(
            self,
            request,
            *args,
            **kwargs
    ):
        params = request.query_params
        webhook_id = params.get('webhook_id', None)
        token = params.get('token', None)
        data = request.data

        try:
            if webhook_id is not None and data['event']["type"] == "batch:v1:upload":
                webhook = Webhook.objects.filter(pk=webhook_id, token=token).first()
                if webhook and webhook.key_expired() == False:
                    sequenceLength = data['event']['sequence']['length']
                    sequenceIndex = data['event']['sequence']['index']
                    batchId = data['data']['meta']['batch']['id']
                    dataLength = data['data']['meta']['length']
                    valid_rows = data['data']['validRows']
                    #invalidRows
                    if webhook.type == Webhook.RFX_UPLOAD:
                        create_client_rfxs_from_list(valid_rows)
                    elif webhook.type == Webhook.BUILDING_INFO_UPLOAD_FLATFILE:
                        client_rfx = webhook.metadata.get('client_rfx', None)
                        if client_rfx == None:
                            raise Exception("not provided client rfx in building info")

                        create_buildings_from_list(client_rfx, valid_rows, note_created=f"webhook-{webhook.pk}")
                    elif webhook.type == Webhook.SERVICE_UPLOAD_FLATFILE:
                        client_rfx = webhook.metadata.get('client_rfx', None)
                        if client_rfx == None:
                            raise Exception("not provided client rfx in service")
                        create_services_from_list(client_rfx, valid_rows, note_created=f"webhook-{webhook.pk}")

                    webhook.metadata['batchId'] = batchId
                    webhook.metadata['sequenceLength'] = sequenceLength
                    sequenceSucceed = webhook.metadata.get('sequenceSucceed', [])
                    sequenceSucceed.append({
                        "index": sequenceIndex,
                        "dataLength": dataLength
                    })
                    return Response(data={'Recieved'}, status=status.HTTP_200_OK)
        except Exception as e:
            Log.dev_logging('Webhook', repr(e), metadata={
                "webhook_id": webhook_id,
                "token": token,
                "data": data
            })
        return Response(data={'Invalid Webhook'}, status=status.HTTP_400_BAD_REQUEST)
