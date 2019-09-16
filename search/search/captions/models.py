from django.db import models

class Caption(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    uploader = models.CharField(max_length=100, blank=True, default='')
    videoid = models.CharField(max_length=11, default='')
    description = models.CharField(max_length=800, default='')
    thumbnail = models.CharField(max_length=100, default='')
    captions = models.TextField()

    class Meta:
        ordering = ['created']
