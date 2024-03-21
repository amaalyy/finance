from datetime import timedelta

from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.db.models import Sum
from django.http import HttpRequest

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from .pagination import CustomPagination
from .models import Transaction, Category
from .serializers import (TransactionsSerializer,
                          CategorySerializer,
                          IncomeReportSerializer,
                          ExpenseReportSerializer)



# ############     transaction    #################

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def getTransactions(request):

    if request.method == 'GET':
        return getTransactionList(request)

    if request.method == 'POST':
        request.data['user'] = request.user.id
        return createTransaction(request)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_balance(request):
    total_income = Transaction.objects.filter(
        user=request.user, transaction_type='IN').aggregate(
        Sum('amount'))['amount__sum'] or 0
    total_expense = Transaction.objects.filter(
        user=request.user, transaction_type='EX').aggregate(
        Sum('amount'))['amount__sum'] or 0
    balance = total_income - total_expense
    return Response({'balance': balance,
                     'total_income': total_income,
                     'total_expense': total_expense})


def getTransactionList(request: HttpRequest):
    paginator = CustomPagination()
    transactions = Transaction.objects.filter(
        user=request.user).order_by('-updated')

    # Check if pagination parameters exist in the request
    if 'page' in request.query_params or 'page_size' in request.query_params:
        result_page = paginator.paginate_queryset(transactions, request)
        serializer = TransactionsSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    # If no pagination parameters, return all transactions without pagination
    serializer = TransactionsSerializer(transactions, many=True)
    return Response(serializer.data)


def getTransactionDetail(request, pk):
    transaction = Transaction.objects.get(id=pk)
    serializer = TransactionsSerializer(transaction, many=False)
    return Response(serializer.data)


def createTransaction(request):
    serializer = TransactionsSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def updateTransaction(request, pk):
    transaction = Transaction.objects.get(pk=pk)
    if transaction.user != request.user:
        return Response(
            {'error':
             'You do not have permission to update this transaction.'},
            status=status.HTTP_403_FORBIDDEN)

    serializer = TransactionsSerializer(
        instance=transaction, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def deleteTransaction(request, pk):
    transaction = Transaction.objects.get(pk=pk)
    if transaction.user != request.user:
        return Response(
            {
                'error':
                'You do not have permission to delete this transaction.'},
            status=status.HTTP_403_FORBIDDEN)
    transaction.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# ############     category    #################


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def getCategories(request):
    if request.method == 'GET':
        request.data['user'] = request.user.id
        return get_categories_list(request)
    elif request.method == 'POST':
        request.data['user'] = request.user.id
        return create_category(request)


@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def category_detail(request, category_id):
    try:
        category = Category.objects.get(id=category_id, user=request.user)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return get_category_detail(request, category)
    elif request.method == 'PUT':
        return update_category(request, category)
    elif request.method == 'DELETE':
        return delete_category(request, category)


def get_categories_list(request):
    paginator = CustomPagination()
    categories = Category.objects.filter(user=request.user)

    # Check if pagination parameters exist in the request
    if 'page' in request.query_params or 'page_size' in request.query_params:
        result_page = paginator.paginate_queryset(categories, request)
        serializer = CategorySerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    # If no pagination parameters, return all categories without pagination
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


def create_category(request):
    request.data['user'] = request.user.id
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def get_category_detail(request, category):
    serializer = CategorySerializer(category)
    return Response(serializer.data)


def update_category(request, category):
    serializer = CategorySerializer(category, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def delete_category(request, category):
    category.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
# ############     User auth    #################


@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if not username or not password:
        return Response({'error': 'Username and password are required'},
                        status=status.HTTP_400_BAD_REQUEST)

    # Password Validation
    try:
        validate_password(password)
    except ValidationError as e:
        return Response({'error': e.messages}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'},
                        status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password)
    return Response({'success': 'User registered successfully'},
                    status=status.HTTP_201_CREATED)


@api_view(['POST'])
def user_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    remember_me = request.data.get('remember_me')

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        refresh = RefreshToken.for_user(user)
        if remember_me:
            # Set token expiration to 30 days
            refresh.set_exp(lifetime=timedelta(days=30))
        return Response({
            'success': 'Login successful',
            'token': str(refresh.access_token),
            'refresh_token': str(refresh),
            'username': user.username
        })
    else:
        return Response({'error': 'Invalid credentials'},
                        status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    try:
        refresh_token = request.data.get('refresh_token')
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'success': 'Logout successful'},
                            status=status.HTTP_200_OK)
        else:
            return Response({'error': 'No refresh token provided'},
                            status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_auth(request):
    """
    Check if the user is authenticated and return user data.
    """
    user = request.user
    user_data = {
        'username': user.username,
        'email': user.email,
        # Include any other user data you want to return
    }
    return Response({'authenticated': True, 'user': user_data})



# ############  Reports ############################

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_income_report(request):
    user = request.user
    income_transactions = Transaction.objects.filter(
        user=user, transaction_type='IN')
    categories = Category.objects.filter(user=user).distinct()

    income_data = []
    for category in categories:
        total_amount = income_transactions.filter(
            category=category).aggregate(
            total_amount=Sum('amount'))['total_amount'] or 0
        if total_amount != 0:
            income_data.append(
                {'category': category.name, 'total_amount': total_amount})

    serializer = IncomeReportSerializer(income_data, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_expense_report(request):
    user = request.user
    expense_transactions = Transaction.objects.filter(
        user=user, transaction_type='EX')
    categories = Category.objects.filter(user=user).distinct()

    expense_data = []
    for category in categories:
        total_amount = expense_transactions.filter(
            category=category).aggregate(
            total_amount=Sum('amount'))['total_amount'] or 0
        if total_amount != 0:
            expense_data.append(
                {'category': category.name, 'total_amount': total_amount})

    serializer = ExpenseReportSerializer(expense_data, many=True)
    return Response(serializer.data)

# ######### balance ###########

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def getTransaction(request, pk):
    try:
        transaction = Transaction.objects.get(pk=pk)
        if transaction.user != request.user:
            return Response(
                {
                    'error':
                    'You do not have permission to access this transaction.'},
                status=status.HTTP_403_FORBIDDEN)
    except Transaction.DoesNotExist:
        return Response({'error': 'Transaction not found.'},
                        status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return getTransactionDetail(request, pk)

    if request.method == 'PUT':
        return updateTransaction(request, pk)

    if request.method == 'DELETE':
        return deleteTransaction(request, pk)
