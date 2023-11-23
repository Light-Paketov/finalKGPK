# Generated by Django 3.2.13 on 2023-11-22 18:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Computer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pcNumber', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Round',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=False, null=True)),
                ('title', models.CharField(max_length=10, unique=True)),
                ('computer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='app.computer')),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('teamName', models.CharField(max_length=10, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Tasks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=10, unique=True)),
                ('content', models.TextField(unique=True)),
                ('input_data', models.TextField()),
                ('output_data', models.TextField()),
                ('task', models.TextField()),
                ('task_answer', models.TextField()),
                ('task_rating', models.IntegerField(default=0)),
                ('round', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.round')),
            ],
        ),
        migrations.CreateModel(
            name='Result',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('result', models.TextField(default=None, null=True)),
                ('rating', models.IntegerField(default=0, null=True)),
                ('comment', models.TextField(default='нет комментария', null=True)),
                ('computer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.computer')),
                ('round', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='round_title_result', to='app.round')),
                ('task_content', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='task_content_result', to='app.tasks')),
                ('task_title', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='task_title_result', to='app.tasks')),
            ],
        ),
        migrations.AddField(
            model_name='computer',
            name='team',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.team'),
        ),
    ]