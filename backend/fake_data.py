import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'finance_app.settings')

import django
django.setup()


import random
from faker import Faker
from api.models import Category, Transaction
from django.contrib.auth.models import User
from django.utils.timezone import make_aware
from datetime import datetime, timedelta

fake = Faker()

# Function to generate fake data for categories
def generate_fake_categories(num_categories=100):
    categories = []
    users = User.objects.all()  # Assuming you have users in your database

    for _ in range(num_categories):
        category = Category(
            name=fake.word(),
            user=random.choice(users)
        )
        categories.append(category)

    Category.objects.bulk_create(categories)


def generate_fake_transactions(num_transactions=1000):
    transactions = []
    users = User.objects.all()
    categories = Category.objects.all()

    # Define start and end dates for the two-month period
    end_date = datetime.now()
    start_date = end_date - timedelta(days=90)

    for _ in range(num_transactions):
        transaction_type = random.choice([Transaction.INCOME, Transaction.EXPENSE])
        amount = fake.random_number(digits=4)  # Generate a random amount
        user=random.choice(users)
        category = random.choice(categories.filter(user=user.id))
        description = fake.sentence()

        # Generate a random date within the two-month period
        created = fake.date_time_between(start_date=start_date, end_date=end_date)

        # Create the transaction object
        transaction = Transaction.objects.create(
            transaction_type=transaction_type,
            amount=amount,
            category=category,
            description=description,
            created=created,
            user=user
        )
        transactions.append(transaction)

    return transactions

if __name__ == '__main__':
    # Make sure to call `make_aware` to ensure that the datetime objects are timezone aware
    make_aware_datetime = make_aware(datetime.now())
#    generate_fake_categories()
    generate_fake_transactions()
