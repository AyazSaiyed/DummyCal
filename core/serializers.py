from abc import ABC

from rest_framework import serializers

from core.utils import update_object


class ReadWriteSerializerMethodField(serializers.SerializerMethodField):
    def __init__(self, method_name=None, **kwargs):
        self.method_name = method_name
        kwargs['source'] = '*'
        super(serializers.SerializerMethodField, self).__init__(**kwargs)

    def to_internal_value(self, data):
        return {self.field_name: data}


class CreateUpdateSerializer(serializers.SerializerMethodField):

    def update(self, instance, validated_data):
        return update_object(instance, validated_data)

    def create(self, validated_data):
        return update_object((), validated_data)
