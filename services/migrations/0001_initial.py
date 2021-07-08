# Generated by Django 2.2.24 on 2021-06-23 08:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('buildings', '0001_initial'),
        ('suppliers', '0002_auto_20210623_0839'),
        ('client_rfxs', '0002_auto_20210623_0839'),
    ]

    operations = [
        migrations.CreateModel(
            name='Assumption',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('details', models.TextField(blank=True, verbose_name='Assumption Details')),
                ('buildings', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='assumptions', to='buildings.Building')),
                ('client_rfx', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assumptions', to='client_rfxs.ClientRfx')),
            ],
        ),
        migrations.CreateModel(
            name='ClientService',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('service_name', models.CharField(max_length=255, verbose_name='Client Service Name')),
                ('client_service_number', models.CharField(blank=True, max_length=255, verbose_name='Client Service Number')),
                ('other_service_data', models.TextField(blank=True, verbose_name='Other Service from Client')),
                ('client_verified', models.BooleanField(default=False, verbose_name='Client Verified')),
                ('assumption', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='client_service', to='services.Assumption')),
                ('client_rfx', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='client_service', to='client_rfxs.ClientRfx')),
            ],
            options={
                'verbose_name': 'ClientService',
                'verbose_name_plural': 'ClientServices',
            },
        ),
        migrations.CreateModel(
            name='ServiceByBuilding',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('delivery_model', models.CharField(blank=True, max_length=255, verbose_name='Delivery Model')),
                ('baseline_cost', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Baseline Cost')),
                ('year_1_cost', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Year 1 Cost')),
                ('year_2_cost', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Year 2 Cost')),
                ('year_3_cost', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Year 3 Cost')),
                ('cost_per_sq_ft', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Cost per sq ft')),
                ('pricing_source', models.CharField(blank=True, max_length=255, verbose_name='Pricing source')),
                ('supplier_name', models.CharField(blank=True, max_length=255, verbose_name='Supplier Name')),
                ('building', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='services_by_building', to='buildings.Building')),
                ('client_service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='services_by_building', to='services.ClientService')),
            ],
            options={
                'verbose_name': 'ServiceByBuilding',
                'verbose_name_plural': 'ServiceByBuildings',
            },
        ),
        migrations.CreateModel(
            name='ProductCatalog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level_1', models.CharField(blank=True, max_length=255, verbose_name='Level 1')),
                ('level_2', models.CharField(blank=True, max_length=255, verbose_name='Level 2')),
                ('level_3', models.CharField(blank=True, max_length=255, verbose_name='Level 3')),
                ('suppliers', models.ManyToManyField(blank=True, to='suppliers.Supplier')),
            ],
            options={
                'verbose_name': 'ProductCatalog',
                'verbose_name_plural': 'ProductCatalogs',
            },
        ),
        migrations.AddField(
            model_name='clientservice',
            name='product_catalog',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='client_service', to='services.ProductCatalog'),
        ),
        migrations.AddField(
            model_name='assumption',
            name='service_by_building',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='assumptions', to='services.ServiceByBuilding'),
        ),
    ]
