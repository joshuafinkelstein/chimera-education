from django.urls import path, include
from haystack import urls
from rest_framework.urlpatterns import format_suffix_patterns
from captions import views

urlpatterns = [
    path('captions/', views.CaptionList.as_view()),
    path('captions/<int:pk>/', views.CaptionDetail.as_view()),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('search/', include('haystack.urls')),
]

urlpatterns = format_suffix_patterns(urlpatterns)
