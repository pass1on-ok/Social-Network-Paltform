# Generated by Django 5.0.3 on 2024-04-24 19:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0002_post_body'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='image_path',
            field=models.ImageField(blank=True, upload_to='post_images/'),
        ),
    ]
