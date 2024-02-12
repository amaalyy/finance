from django.http import response
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Transaction
from .serializers import TransactionsSerializer


@api_view(['GET'])
def getRouts(request):
    routes = [
        {
            'Endpoint': '/transactions/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of transactions'
        },
        {
            'Endpoint': '/transactions/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single transaction object'
        },
        {
            'Endpoint': '/transactions/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new transaction with data sent in post request'
        },
        {
            'Endpoint': '/transactions/id/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Update an existing transaction with data sent in post request'
        },
        {
            'Endpoint': '/transactions/id/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting transaction'
        },
    ]
    return Response(routes)



# /transaction GET
# /transaction POST
# /transaction/<id> GET
# /transaction/<id> PUT
# /transaction/<id> DELETE

@api_view(['GET', 'POST'])
def getTransactions(request):

    if request.method == 'GET':
        return getTransactionList(request)

    if request.method == 'POST':
        return createTransaction(request)


@api_view(['GET', 'PUT', 'DELETE'])
def getTransaction(request, pk):

    if request.method == 'GET':
        return getTransactionDetail(request, pk)

    if request.method == 'PUT':
        return updateTransaction(request, pk)

    if request.method == 'DELETE':
        return deleteTransaction(request, pk)



def getTransactionList(request):
    transactions = Transaction.objects.all().order_by('-updated')
    serializer = TransactionsSerializer(transactions, many=True)
    return Response(serializer.data)


def getTransactionDetail(request, pk):
    transaction = Transaction.objects.get(id=pk)
    serializer = TransactionsSerializer(transaction, many=False)
    return Response(serializer.data)


def createTransaction(request):
    data = request.data
    transaction = Transaction.objects.create(
                transaction_type=data['transaction_type'],
                amount=data['amount'],
                category_id=data['category_id'],
                description=data['description']
            )
    serializer = TransactionsSerializer(transaction, many=False) 
    return Response(serializer.data)

def updateTransaction(request, pk):
    data = request.data
    transaction = Transaction.objects.get(id=pk)
    serializer = TransactionsSerializer(instance=transaction, data=data)

    if serializer.is_valid():
        serializer.save()

    return serializer.data


def deleteTransaction(request, pk):
    transaction = Transaction.objects.get(id=pk)
    transaction.delete()
    return Response('Transaction was deleted!')
