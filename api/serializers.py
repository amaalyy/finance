from rest_framework.serializers import ModelSerializer, CharField
from .models import Transaction


class TransactionsSerializer(ModelSerializer):
    category_name = CharField(source='category.name', read_only=True)
    class Meta:
        model = Transaction
        fields = ['id', 'transaction_type', 'amount', 'category_name','category', 'description', 'updated', 'created']
