# Generated by Django 3.1.2 on 2020-11-02 14:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('children', '0015_auto_20201102_1400'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payments',
            name='register',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='children.registeredchild'),
        ),
    ]
