# Generated by Django 3.1.2 on 2021-02-01 20:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('children', '0016_auto_20201102_1403'),
    ]

    operations = [
        migrations.CreateModel(
            name='Settings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=100)),
                ('value', models.CharField(max_length=500)),
            ],
        ),
    ]
