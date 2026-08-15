import json
from django.shortcuts import render
from .models import Ad

def map_view(request):
    ads = Ad.objects.all()
    # Serialize to JSON so JS can easily parse it
    ads_data = [
        {
            'id': ad.id,
            'title': ad.title,
            'description': ad.description,
            'latitude': ad.latitude,
            'longitude': ad.longitude,
        }
        for ad in ads
    ]
    
    context = {
        'ads_json': json.dumps(ads_data),
        'naver_client_id': 'kf3oivuas3'
    }
    return render(request, 'ads/map.html', context)
