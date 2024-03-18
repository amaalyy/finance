from rest_framework.serializers import ModelSerializer ,CharField
from rest_framework import serializers
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

class IncomeReportSerializer(serializers.Serializer):
    category = serializers.CharField()
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2)

class ExpenseReportSerializer(serializers.Serializer):
    category = serializers.CharField()
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
