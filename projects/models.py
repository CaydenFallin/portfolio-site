from django.db import models
from ckeditor.fields import RichTextField

class Project(models.Model):
    CATEGORY_CHOICES = [
        ('game', 'Game'),
        ('music', 'Music'),
        ('video', 'Video'),
        ('web', 'Web'),
        ('other', 'Other'),
    ]
    title = models.CharField(max_length=200)
    short_description = RichTextField()
    long_description = models.TextField(blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    tags = models.CharField(max_length=200, blank=True)
    order = models.IntegerField(default=0)
    featured = models.BooleanField(default=False)
    date_made = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title

class ProjectImage(models.Model):
    project = models.ForeignKey(Project, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='projects/')
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

class ProjectLink(models.Model):
    project = models.ForeignKey(Project, related_name='links', on_delete=models.CASCADE)
    label = models.CharField(max_length=100)
    url = models.URLField()

    def __str__(self):
        return f"{self.project.title} — {self.label}"