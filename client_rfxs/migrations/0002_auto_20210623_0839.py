# Generated by Django 2.2.24 on 2021-06-23 08:39

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client_rfxs', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clientrfx',
            name='competitors',
        ),
        migrations.RemoveField(
            model_name='clientrfx',
            name='note_created',
        ),
        migrations.RemoveField(
            model_name='clientrfx',
            name='total_headcount',
        ),
        migrations.RemoveField(
            model_name='clientrfx',
            name='total_square_footage',
        ),
        migrations.AddField(
            model_name='clientrfx',
            name='date_updated',
            field=models.DateTimeField(auto_now=True, db_index=True, verbose_name='Date updated'),
        ),
        migrations.AddField(
            model_name='clientrfx',
            name='status',
            field=models.CharField(blank=True, max_length=10, verbose_name='Client status'),
        ),
        migrations.AlterField(
            model_name='clientrfx',
            name='region',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, verbose_name='Region'),
        ),
    ]