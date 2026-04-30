from django.shortcuts import render, redirect
from .forms import ContactForm
from projects.models import Project

def index(request):
    projects = Project.objects.prefetch_related('images', 'links').all()
    return render(request, 'core/index.html', {'projects': projects})

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
    return redirect('index')