// BalanceSummary.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import { Doughnut } from 'react-chartjs-2';

const BalanceSummary = (forceRemount) => {
  const [balanceData, setBalanceData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/balance/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
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
        backgroundColor: ['#FFC6FE', '#A0C4FF', '#9BF6FF'],
        borderWidth: 1,
        data: [
          balanceData ? balanceData.total_income : 0,
          balanceData ? balanceData.total_expense : 0,
          balanceData ? balanceData.balance : 0
        ]
      }
    ]
  };
  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  return (
    <div className=''>
      {error && <p>Error fetching balance: {error}</p>}
      {balanceData && (
        <>
          <div className="h-[400px] w-[400px] p-6 ml-[135px] mt-[120px] bg-white rounded-3xl drop-shadow-xl">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </>
      )}
    </div>
  );
};

export default BalanceSummary;
