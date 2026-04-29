from django.shortcuts import render
from .models import Project

def portfolio(request):
    projects = Project.objects.prefetch_related('images', 'links').all()
    return render(request, 'core/index.html', {'projects': projects})