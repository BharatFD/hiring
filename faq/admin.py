
# Register your models here.
# faq/admin.py

from django.contrib import admin
from .models import FAQ
from ckeditor.widgets import CKEditorWidget
from django.db import models
from django import forms

class FAQAdmin(admin.ModelAdmin):
    list_display = ("id", "question", "language", "created_at")
    search_fields = ("question", "answer")  # Enable search
    list_filter = ("language",)  # Add a filter for language-based FAQs
    ordering = ("id",)
    # list_display = ("question", "answer")
    
    formfield_overrides = {
        models.TextField: {"widget": CKEditorWidget()},  # Enable CKEditor
    }
    
   
    
admin.site.register(FAQ, FAQAdmin)

