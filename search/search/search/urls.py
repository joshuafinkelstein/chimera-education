from django.conf.urls import include
from django.urls import path
from rest_framework import routers
from captions import views

router = routers.DefaultRouter()

urlpatterns = [
    path('', include('captions.urls'))
]

urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
]
