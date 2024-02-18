from django.urls import path
from . import views


urlpatterns = [
    path('', views.getRouts),
    path('transaction/', views.getTransactions),
    path('transaction/<int:pk>', views.getTransaction),
    path('register/', views.register),
    path('login/', views.user_login),
    path('check-auth/', views.check_auth),
]
