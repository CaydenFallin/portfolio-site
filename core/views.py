from django.shortcuts import render, redirect
from django.core.mail import send_mail
from .forms import ContactForm
from projects.models import Project
import os

def index(request):
    projects = Project.objects.prefetch_related('images', 'links').all()
    return render(request, 'core/index.html', {'projects': projects})

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            msg = form.save()
            try:
                send_mail(
                    subject=f'Portfolio message from {msg.name}',
                    message=f'Name: {msg.name}\nEmail: {msg.email}\n\nMessage:\n{msg.message}',
                    from_email=msg.email,
                    recipient_list=[os.getenv('EMAIL_HOST_USER')],
                    fail_silently=False,
                )
            except Exception:
                pass
            return redirect('index')
    return redirect('index')