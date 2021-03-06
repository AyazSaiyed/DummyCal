# Generated by Django 2.2.24 on 2021-06-26 17:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('buildings', '0003_auto_20210625_2239'),
    ]

    operations = [
        migrations.RenameField(
            model_name='building',
            old_name='client_site_id',
            new_name='site_id',
        ),
        migrations.AlterField(
            model_name='building',
            name='building_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='buildings', to='buildings.BuildingType'),
        ),
    ]
