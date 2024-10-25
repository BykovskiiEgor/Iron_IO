# Generated by Django 5.0.2 on 2024-02-22 10:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('session', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='user',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.UUIDField(verbose_name='Идентификатор юзера')),
                ('session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='session.session')),
            ],
        ),
    ]
