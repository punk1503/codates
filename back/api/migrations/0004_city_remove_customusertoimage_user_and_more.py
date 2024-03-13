# Generated by Django 5.0.2 on 2024-03-08 09:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_technology_customusergrades_customuserrankings_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('latitude', models.FloatField()),
            ],
        ),
        migrations.RemoveField(
            model_name='customusertoimage',
            name='user',
        ),
        migrations.AlterUniqueTogether(
            name='customusertotechnology',
            unique_together=None,
        ),
        migrations.RemoveField(
            model_name='customusertotechnology',
            name='technology',
        ),
        migrations.RemoveField(
            model_name='customusertotechnology',
            name='user',
        ),
        migrations.AddField(
            model_name='customuser',
            name='technologies',
            field=models.ManyToManyField(to='api.technology'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='city',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.city'),
        ),
        migrations.DeleteModel(
            name='CustomUserRankings',
        ),
        migrations.DeleteModel(
            name='CustomUserToImage',
        ),
        migrations.DeleteModel(
            name='CustomUserToTechnology',
        ),
    ]
