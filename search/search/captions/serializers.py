from django.contrib.auth.models import User
from rest_framework import serializers
from captions.models import Caption


class UserSerializer(serializers.HyperlinkedModelSerializer):
    captions = serializers.PrimaryKeyRelatedField(many=True, queryset=Caption.objects.all())
    class Meta:
        model = User
        fields = ['url', 'username', 'captions']


class CaptionSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    # owner = serializers.ReadOnlyField(source='owner.username')
    title = serializers.CharField(required=False, allow_blank=True, max_length=100)
    uploader = serializers.CharField(required=False, allow_blank=True, max_length=100)
    videoid = serializers.CharField(required=False, max_length=11)
    description = serializers.CharField(required=False, max_length=800)
    thumbnail = serializers.CharField(required=False, max_length=100)
    captions = serializers.CharField(style={'base_template': 'textarea.html'})

    def create(self, validated_data):
        """
        Create and return a new `Caption` instance, given the validated data.
        """
        return Caption.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Caption` instance, given the validated data.
        """
        instance.title = validated_data.get('title', instance.title)
        instance.uploader = validated_data.get('uploader', instance.uploader)
        instance.videoid = validated_data.get('videoid', instance.videoid)
        instance.description = validated_data.get('description', instance.description)
        instance.thumbnail = validated_data.get('thumbnail', instance.thumbnail)
        instance.captions = validated_data.get('captions', instance.captions)
        instance.save()
        return instance
