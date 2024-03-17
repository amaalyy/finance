// BalanceSummary.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import { Bar } from 'react-chartjs-2';

const BalanceSummary = ({ forceRemount }) => {
  const [balanceData, setBalanceData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/balance/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBalanceData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBalance();
  }, [forceRemount]);

  const chartData = {
    labels: ['Total Income', 'Total Expense', 'Balance'],
    datasets: [
      {
        label: 'TND', // Tunisian Dinar
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
        data: [
          balanceData ? balanceData.total_income : 0,
          balanceData ? balanceData.total_expense : 0,
          balanceData ? balanceData.balance : 0,
        ],
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card title="Balance Summary">
      {error && <p>Error fetching balance: {error}</p>}
      {balanceData && (
        <>
          <div>
            <p>Total Income: TND {balanceData.total_income}</p>
            <p>Total Expense: TND {balanceData.total_expense}</p>
            <p>Balance: TND {balanceData.balance}</p>
          </div>
          <div>
            <h3>Expenses by Category:</h3>
            <ul>
              {balanceData.expenses_by_category &&
                Object.entries(balanceData.expenses_by_category).map(([category, expense]) => (
                  <li key={category}>
                    {category}: TND {expense}
                  </li>
                ))}
            </ul>
          </div>
          <div className="h-[600px] w-[600px] bg-white">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </>
      )}
    </Card>
  );
};

export default BalanceSummary;
