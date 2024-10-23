# Generated by Django 5.0.2 on 2024-03-17 10:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('session', '0004_remove_session_uuid'),
    ]

    operations = [
        migrations.AddField(
            model_name='session',
            name='session_id',
            field=models.BigIntegerField(default=0, editable=False, unique=True, verbose_name='Идентификатор сессии'),
        ),
    ]
