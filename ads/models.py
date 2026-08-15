from django.db import models

class Ad(models.Model):
    title = models.CharField(max_length=200, verbose_name="광고 제목")
    description = models.TextField(verbose_name="광고 내용", blank=True)
    latitude = models.FloatField(verbose_name="위도 (Latitude)")
    longitude = models.FloatField(verbose_name="경도 (Longitude)")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="등록일")

    def __str__(self):
        return self.title
