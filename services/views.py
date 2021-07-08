from django.shortcuts import render
from .models import ClientService, ServiceByBuilding, Assumption
from client_rfxs.models import ClientRfx
from buildings.models import Building
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
# Create your views here.

def viewAndExportData(request,client_id):
	try:
		token = request.META.get('HTTP_AUTHORIZATION')
		if(len(Token.objects.filter(key=token.split(' ')[1]))!=0):
			# if(Token.objects.get())
			data = {}
			client_rfx_data = ClientRfx.objects.get(client_id = client_id)

			client_rfx_id = client_rfx_data.id
			client_services = ClientService.objects.filter(client_rfx=client_rfx_id)
			client_services_data = [{'service_id':i.id,'service_name':i.service_name} for i in client_services]
			servicesByBuilding = []
			for j in client_services_data:
				
				client_service_id = j['service_id']
				temp = ServiceByBuilding.objects.filter(client_service = client_service_id)
				temp_building = Building.objects.filter(id = temp[0].id)
			
				for i in range(len(temp)):
					delivery_model_id = [j.deliveryModel for j in temp]
					services_by_building_id = [k.id for k in temp]
					temp_assumptions = Assumption.objects.filter(service_by_building = services_by_building_id[i])

					servicesByBuilding.append({'building_id':temp_building[i].id,'building_name':temp_building[i].building_name,
						'client_services':[{'service_id':j['service_id'],'service_name':j['service_name']}],
						'serviceByBuilding':[{'id':temp.id,'inScope':temp.inScope,'baseline_cost':temp.baseline_cost,'year_1_cost':temp.year_1_cost,'year_2_cost':temp.year_2_cost,'year_3_cost':temp.year_3_cost,'cost_per_sq_ft':temp.cost_per_sq_ft,'pricing_source':temp.pricing_source,'supplier_name':temp.supplier_name} for temp in temp],
						'delivery_model':{'id':delivery_model_id[0].id,'delivery_model_name':delivery_model_id[0].name},
						'assumptions':[{'id':temp_assumptions.id,'name':temp_assumptions.name,'value':temp_assumptions.value,'unit':temp_assumptions.unit,'source':temp_assumptions.source} for temp_assumptions in temp_assumptions]})
			
			data['client_id'] = client_id
			data['client_rfx_id'] = client_rfx_id
			data['building_and_service'] = servicesByBuilding
			return JsonResponse(data)
		else:
			return JsonResponse({'message':'Authorization failed.'})
	
	except Exception as e:
	
		return JsonResponse({'message':'Records not found.'})
