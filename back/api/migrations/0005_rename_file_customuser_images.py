# Generated by Django 5.0.2 on 2024-03-02 20:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_profileimage_remove_customusertoimage_user_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customuser',
            old_name='file',
            new_name='images',
        ),
    ]
