from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Transaction
from .serializers import TransactionsSerializer
from datetime import timedelta
from rest_framework import status
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['GET'])
def getRouts(request):
    routes = [
        {
            'Endpoint': '/transaction/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of transactions'
        },
        {
            'Endpoint': '/transaction/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single transaction object'
        },
        {
            'Endpoint': '/transaction/',
            'method': 'POST',
            'body': {
                        "transaction_type": "",
                        "amount": 0,
                        "category": 0,
                        "description": "",
                    },
            'description': 'Creates new transaction with data sent in post request'
        },
        {
            'Endpoint': '/transaction/id/',
            'method': 'PUT',
            'body': {
                        "transaction_type": "",
                        "amount": 0,
                        "category": 0,
                        "description": ""
                    },
            'description': 'Update an existing transaction with data sent in post request'
        },
        {
            'Endpoint': '/transaction/id/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting transaction'
        },
        {
            'Endpoint': '/api/register/',
            'Method': 'POST',
            'Body': {
                "username": "",
                "password": "",
                "email": ""
            },
            'Description': 'Registers a new user'
        },
        {
            'Endpoint': '/api/login/',
            'Method': 'POST',
            'Body': {
                "username": "",
                "password": ""
            },
            'Description': 'Logs in the user and obtains an authentication token'
        },
    ]
    return Response(routes)



# /transaction GET
# /transaction POST
# /transaction/<id> GET
# /transaction/<id> PUT
# /transaction/<id> DELETE

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def getTransactions(request):

    if request.method == 'GET':
        return getTransactionList(request)

    if request.method == 'POST':
        request.data['user'] = request.user.id
        return createTransaction(request)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def getTransaction(request, pk):
    try:
        transaction = Transaction.objects.get(pk=pk)
        if transaction.user != request.user:
            return Response({'error': 'You do not have permission to access this transaction.'}, status=status.HTTP_403_FORBIDDEN)
    except Transaction.DoesNotExist:
        return Response({'error': 'Transaction not found.'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return getTransactionDetail(request, pk)

    if request.method == 'PUT':
        return updateTransaction(request, pk)

    if request.method == 'DELETE':
        return deleteTransaction(request, pk)




#############     User auth    #################


@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({'success': 'User registered successfully'}, status=status.HTTP_201_CREATED)

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
            refresh.set_exp(lifetime=timedelta(days=30))  # Set token expiration to 30 days
        return Response({
            'success': 'Login successful',
            'token': str(refresh.access_token),
            'refresh_token': str(refresh)
        })
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

def getTransactionList(request):
    transactions = Transaction.objects.filter(user=request.user).order_by('-updated')
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
        return Response({'error': 'You do not have permission to update this transaction.'}, status=status.HTTP_403_FORBIDDEN)

    serializer = TransactionsSerializer(instance=transaction, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



def deleteTransaction(request, pk):
    transaction = Transaction.objects.get(pk=pk)
    if transaction.user != request.user:
        return Response({'error': 'You do not have permission to delete this transaction.'}, status=status.HTTP_403_FORBIDDEN)
    transaction.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

