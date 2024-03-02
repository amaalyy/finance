from django.db import models
from django.contrib.auth.models import User



class Category(models.Model):
  name = models.CharField(max_length=100)
  

  def __str__(self):
      return self.name


class Transaction(models.Model):
  INCOME = 'IN'
  EXPENSE = 'EX'
  TRANSACTION_CHOICES = [
      (INCOME, 'Income'),
      (EXPENSE, 'Expense'),
  ]
    
  transaction_type = models.CharField(max_length=2, choices=TRANSACTION_CHOICES)

  amount = models.DecimalField(max_digits=8,decimal_places=2, verbose_name = "amount", null=False)


  category = models.ForeignKey(Category, on_delete=models.CASCADE)


  description  = models.TextField(null=True, blank=True)
  updated = models.DateTimeField(auto_now=True)
  created = models.DateTimeField(auto_now_add=True)

  user = models.ForeignKey(User, on_delete=models.CASCADE)

  def __str__(self):
    return (f"{self.transaction_type} {self.description[0:40]}")
  