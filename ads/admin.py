from django.contrib import admin
from .models import Ad

@admin.register(Ad)
class AdAdmin(admin.ModelAdmin):
    list_display = ('title', 'latitude', 'longitude', 'created_at')
    search_fields = ('title',)
    change_form_template = 'admin/ads/ad/change_form.html'
