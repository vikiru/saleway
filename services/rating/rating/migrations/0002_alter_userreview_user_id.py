from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('rating', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userreview',
            name='user_id',
            field=models.CharField(max_length=255),
        ),
    ]
