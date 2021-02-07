# Generated by Django 3.1.2 on 2021-02-06 19:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('children', '0017_settings'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='registeredchild',
            name='days',
        ),
        migrations.AddField(
            model_name='registeredchild',
            name='days',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='children.days'),
        ),
    ]