# Generated by Django 3.2.13 on 2023-11-23 12:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_auto_20231123_1428'),
    ]

    operations = [
        migrations.AddField(
            model_name='tasks',
            name='test_input',
            field=models.TextField(default='0'),
        ),
        migrations.AddField(
            model_name='tasks',
            name='test_output',
            field=models.TextField(default='0'),
        ),
    ]