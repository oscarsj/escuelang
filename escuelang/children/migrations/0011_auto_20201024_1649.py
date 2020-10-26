# Generated by Django 3.1.2 on 2020-10-24 16:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('children', '0010_auto_20201024_1640'),
    ]

    operations = [
        migrations.RenameField(
            model_name='child',
            old_name='first_surname',
            new_name='surname',
        ),
        migrations.AlterUniqueTogether(
            name='child',
            unique_together={('name', 'surname')},
        ),
        migrations.RemoveField(
            model_name='child',
            name='second_surname',
        ),
    ]
