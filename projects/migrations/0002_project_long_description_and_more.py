from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='long_description',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='project',
            name='short_description',
            field=models.TextField(),
        ),
    ]