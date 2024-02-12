from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.getRouts, name='routes'),
    path('transaction/', views.getTransactions, name='notes'),
    path('transaction/<int:pk>/', views.getTransaction, name='note'),
]
