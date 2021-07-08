from rest_framework import filters
import json

class CustomSearchFilter(filters.SearchFilter):
    def get_search_fields(self, view, request):
        fields = request.query_params.get('search_fields', None)
        if fields:
            fields_list = fields.split(",")
            return fields_list
        return super(CustomSearchFilter, self).get_search_fields(view, request)

def validateJSON(jsonData):
    try:
        return json.loads(jsonData)
    except ValueError as err:
        return False