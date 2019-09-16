import datetime
from haystack import indexes
from captions.models import Caption


class CaptionIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    title = indexes.CharField(model_attr='title')
    uploader = indexes.CharField(model_attr='uploader')
    thumbnail = indexes.CharField(model_attr='thumbnail')
    description = indexes.CharField(model_attr='description')
    videoid = indexes.CharField(model_attr='videoid')

    def get_model(self):
        return Caption

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.all()
