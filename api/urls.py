from django.urls import path
from . import views


urlpatterns = [
    path('', views.getRouts),
    path('balance/', views.get_balance),
    path('transaction/', views.getTransactions),
    path('transaction/<str:pk>/', views.getTransaction),
    path('categories/', views.getCategories),
    path('categories/<int:category_id>/', views.category_detail),
    path('register/', views.register),
    path('login/', views.user_login),
    path('logout/', views.user_logout),
    path('check-auth/', views.check_auth),
]
