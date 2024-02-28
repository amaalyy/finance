from rest_framework.serializers import ModelSerializer ,CharField
from .models import Transaction, Category


class TransactionsSerializer(ModelSerializer):
    category_name = CharField(source='category.name', read_only=True)
    class Meta:
        model = Transaction
        fields = ['id', 'transaction_type', 'amount','category', 'category_name', 'description', 'updated', 'created']

class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
