from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ecommerceuser',
            name='clerk_user_id',
            field=models.CharField(max_length=255, unique=True, null=True),
        ),
        migrations.AlterField(
            model_name='ecommerceuser',
            name='password',
            field=models.CharField(max_length=255, null=True, blank=True),
        ),
    ]
