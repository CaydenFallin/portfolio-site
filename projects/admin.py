from django.contrib import admin
from .models import Project, ProjectImage, ProjectLink

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1

class ProjectLinkInline(admin.TabularInline):
    model = ProjectLink
    extra = 1

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'order', 'featured']
    list_editable = ['order', 'featured']
    inlines = [ProjectImageInline, ProjectLinkInline]