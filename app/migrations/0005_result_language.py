# Generated by Django 3.2.13 on 2023-11-23 15:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_alter_result_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='result',
            name='language',
            field=models.TextField(default='PASCAL ABC', null=True),
        ),
    ]
