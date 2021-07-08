# Generated by Django 2.2.24 on 2021-06-16 18:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Industry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Client Industry')),
            ],
            options={
                'verbose_name': 'Industry',
                'verbose_name_plural': 'Industries',
            },
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Name')),
                ('industry', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='clients', to='clients.Industry', verbose_name='Industry')),
            ],
            options={
                'verbose_name': 'Client',
                'verbose_name_plural': 'Clients',
            },
        ),
    ]