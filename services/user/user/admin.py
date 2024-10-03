from django.contrib import admin
from .models import CommerceUser


class UserAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "user_name", "email", "password")
    list_filter = ("first_name", "last_name", "user_name", "email")
    search_fields = ("first_name", "last_name", "user_name", "email")
    fields = ("first_name", "last_name", "user_name", "email", "password")


admin.site.register(CommerceUser, UserAdmin)
