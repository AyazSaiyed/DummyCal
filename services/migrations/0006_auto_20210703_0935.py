# Generated by Django 2.2.24 on 2021-07-03 09:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('buildings', '0008_building_note_created'),
        ('services', '0006_remove_service_by_building'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='servicebybuilding',
            unique_together={('client_service', 'building')},
        ),
    ]
