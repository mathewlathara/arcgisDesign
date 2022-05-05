from django.db import models

# Create your models here.

class UserRegistration(models.Model):
    user_id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=255)
    user_password = models.CharField(max_length=50)
    user_status = models.IntegerField(default=1)
    class Meta:
        db_table = 'users_tbl'