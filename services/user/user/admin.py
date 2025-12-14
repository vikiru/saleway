from django.contrib import admin

from .models import EcommerceUser


class EcommerceAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'username', 'email', 'password')
    list_filter = ('first_name', 'last_name', 'username', 'email')
    search_fields = ('first_name', 'last_name', 'username', 'email')


admin.site.register(EcommerceUser, EcommerceAdmin)
