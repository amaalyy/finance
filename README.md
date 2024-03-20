
# [Wealthwise - Financial Management Application](https://via.placeholder.com/10/00b48a?text=+)
Wealthwise is a web-based financial management application designed to help individuals track their expenses, manage their investments, and plan for their financial future with ease. It provides users with tools for budgeting, goal setting, and monitoring their financial health. With Wealthwise, users can gain insights into their spending habits, optimize their savings, and make informed decisions about their money.

This repository contains both the frontend and backend code for the Wealthwise application. The frontend is built using React.js for the user interface, while the backend is developed using Django for the server-side logic and RESTful API endpoints.

## [Table of Contents](https://via.placeholder.com/10/00b48a?text=+)

* [Installation](#Installation)
* [Getting Started](#Getting-Started)
* [Features](#Features)
* [Technologies Used](#Technologies-Used)
* [Usage](#Usage)
* [API Endpoints](#API-Endpoints)
* [Contributing](#Contributing)
* [License](#License)

## [Installation](https://via.placeholder.com/10/00b48a?text=+)
To install and run the Wealthwise application locally, follow these steps:

Clone this repository to your local machine:

```bash
git clone git@github.com:ggMBD/finance.git
```

Navigate to the frontend directory:

```bash
cd wealthwise/frontend
```

Install frontend packages using npm:
```bash
npm i
```

Navigate to the backend directory:

```bash
cd ../
```

Create a virtual environment and activate it:


Install backend requirements using pip:
```bash
pip install -r requirements.txt
```

Set up your PostgreSQL database and update the database settings in the Django settings.py file.

Apply database migrations:
```bash
python manage.py migrate

```
## [Getting Started](https://via.placeholder.com/10/00b48a?text=+)
To run the Wealthwise application locally, follow these steps:

Start the backend server:
```bash
python manage.py runserver
```
In a separate terminal, start the frontend development server:

```sql
npm run dev
```
Access the application in your web browser at `http://localhost:5173/`.
## [Features](https://via.placeholder.com/10/00b48a?text=+)
* User Authentication: Register and login securely to access personal financial data.
* Expense Tracking: Record and categorize expenses to better understand spending patterns.
* Income Management: Track sources of income and analyze overall cash flow.
* Goal Setting: Set financial goals and monitor progress towards achieving them.
* Investment Portfolio: Manage investments and view performance over time.
* Financial Reports: Generate reports and visualizations to gain insights into financial health.
* Customization: Personalize dashboard settings and categories for a tailored experience.
* Security: Implement encryption and authentication mechanisms to ensure data privacy.

## [Technologies Used](https://via.placeholder.com/10/00b48a?text=+)
| Frontend           | Backend          |   
| ----------------- | ------------------------------------------------------------------ |
| [React.js]() | [Django]() |
| [React Router]() | [Django REST Framework]() |
| [Chart.js]() | [PostgreSQL]() |
| [Tailwind CSS]() | [JWT Authentication]() |

## [Usage](https://via.placeholder.com/10/00b48a?text=+)
* Registration and Login: Create a new account or log in with existing credentials.
* Dashboard: View a summary of financial data, including income, expenses, and investment performance.
* Expense Tracking: Add, edit, and categorize expenses to monitor spending habits.
* Goal Setting: Set financial goals and track progress towards achieving them.
* Reports: Generate reports and visualizations to analyze financial trends and patterns.

## [API Endpoints](https://via.placeholder.com/10/00b48a?text=+)
The backend provides the following RESTful API endpoints:

* POST /api/register/: Register a new user.
* POST /api/login/: Log in an existing user and receive a JWT token.
* GET /api/logout/: Log out the current user and invalidate the JWT token.
* GET /api/expenses/: Retrieve a list of expenses.
* POST /api/expenses/: Create a new expense.
* GET /api/income/: Retrieve a list of income sources.
* POST /api/income/: Create a new income source.
* GET /api/goals/: Retrieve a list of financial goals.
* POST /api/goals/: Create a new financial goal.
* GET /api/reports/: Generate financial reports and visualizations.

## [Contributing](https://via.placeholder.com/10/00b48a?text=+)
Contributions to the Wealthwise project are welcome! To contribute, please follow these steps:

* Fork the repository and create a new branch for your feature or bug fix.
* Make changes and ensure that code follows the project's coding conventions.
* Write tests to cover new functionality or changes.
* Submit a pull request with a clear description of your changes and the problem they solve.

## [Authors](https://via.placeholder.com/10/00b48a?text=+)

- [@ggMBD](https://github.com/ggMBD)
- [@Sgun369](https://github.com/Sgun369)
- [@amaalyy](https://www.github.com/amaalyy)






