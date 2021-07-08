from django.db import migrations
from services.models import ServiceByBuilding, Service


def empty_service_mapping(_, __):
    try:
        ServiceByBuilding.objects.all().delete()
    except Exception as e:
        print(e)
        pass


class Migration(migrations.Migration):
    dependencies = [
        ('services', '0005_clientservice_note_created')
    ]

    operations = [
        migrations.RunPython(empty_service_mapping, migrations.RunPython.noop)
    ]
