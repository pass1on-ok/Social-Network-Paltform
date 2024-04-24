from django.contrib import admin
from .models import User, BlacklistedToken
admin.site.register(User)
admin.site.register(BlacklistedToken)
# Register your models here.
