from captions.models import Caption
from captions.serializers import CaptionSerializer, UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework import permissions
from captions.permissions import IsOwnerOrReadOnly


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CaptionList(generics.ListCreateAPIView):
    queryset = Caption.objects.all()
    serializer_class = CaptionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)


class CaptionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Caption.objects.all()
    serializer_class = CaptionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
