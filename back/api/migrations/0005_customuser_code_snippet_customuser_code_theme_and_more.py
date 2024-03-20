# Generated by Django 5.0.2 on 2024-03-15 09:34

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_city_remove_customusertoimage_user_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='code_snippet',
            field=models.TextField(default='print("I love CoDates!")'),
        ),
        migrations.AddField(
            model_name='customuser',
            name='code_theme',
            field=models.CharField(choices=[('atom-one-dark', 'Atom One Dark')], default='', max_length=255),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='ProfilePicture',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.FileField(upload_to='')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profile_picture', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
