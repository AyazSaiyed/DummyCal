# Generated by Django 2.2.24 on 2021-06-26 18:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('buildings', '0005_auto_20210626_1807'),
    ]

    operations = [
        migrations.AlterField(
            model_name='building',
            name='lease_type',
            field=models.CharField(blank=True, choices=[('FULL_SERVICE_GROSS', 'Full Service Gross'), ('MODIFIED_GROSS', 'Modified Gross'), ('ABSOLUTE_NET', 'Absolute Net'), ('NETNETNET', 'NetNetNet')], max_length=20, verbose_name='Lease Type'),
        ),
    ]
