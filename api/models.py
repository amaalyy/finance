from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


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

@receiver(post_save, sender=User)
def create_default_categories(sender, instance, created, **kwargs):
    """
    Signals receiver to create default categories for a new user.
    """
    if created:
        default_categories = [
            'Salary',
            'Rent',
            'Groceries',
            'Transportation',
            'Utilities',
            'Health',
            'Entertainment',
            'Insurance',
            'Education',
            'Other',
            'Gym',
            'Phone',
            'Internet',
            'Cable',
            'Water',
            'Electricity',
            'Gas',
            'Car',
            'Public Transportation',
            'Car Insurance',
            'Gasoline',
            'Travel',
            'Dental',
            'Doctor',
            'Pharmacy',
            'Hospital',
            'Books',
            'Tuition',
            'Supplies',
            'Other',
            'Eating Out',
            'Movies',
            'Concerts',
            'Theater',
            'Sports',
            
        ]
        for category_name in default_categories:
            if not Category.objects.filter(name=category_name).exists():
                Category.objects.create(name=category_name)