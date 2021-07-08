# Generated by Django 2.2.24 on 2021-06-26 18:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('buildings', '0004_auto_20210626_1740'),
    ]

    operations = [
        migrations.AlterField(
            model_name='building',
            name='building_area_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='client_buildings', to='buildings.BuildingType'),
        ),
    ]