from django.contrib import admin

from .models import UserReview


class UserReviewAdmin(admin.ModelAdmin):
    list_display = (
        'user_id',
        'product_id',
        'title',
        'author',
        'review',
        'rating',
        'date_reviewed',
        'date_purchased',
    )
    list_filter = (
        'user_id',
        'product_id',
        'title',
        'author',
        'rating',
        'date_reviewed',
        'date_purchased',
    )
    search_fields = (
        'user_id',
        'product_id',
        'title',
        'author',
        'rating',
        'date_reviewed',
        'date_purchased',
    )


admin.site.register(UserReview, UserReviewAdmin)
