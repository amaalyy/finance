// BalanceSummary.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import { Doughnut } from 'react-chartjs-2';

//Functional component BalanceSummary
const BalanceSummary = ({ forceRemount }) => {
  //state variables
  const [balanceData, setBalanceData] = useState(null); 
  const [error, setError] = useState(null);

//useEffect hook for fetching balance data
  useEffect(() => {
    //Asynchronus function to fetch balance data
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        // Making GET request to fetch balance data
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
// Data for Doughnut chart
  const chartData = {
    labels: ['Total Income', 'Total Expense'],
    datasets: [
      {
        label: 'TND', // Tunisian Dinar
        backgroundColor: ['#CAFEBF', '#fd5b77'],
        borderWidth: 1,
        data: [
          balanceData ? balanceData.total_income : 0,
          balanceData ? balanceData.total_expense : 0,
          // balanceData ? balanceData.balance : 0
        ]
      }
    ]
  };
// options fo doughnut chart
const chartOptions = {
  plugins: {
    title: {
      display: true,
      text: `balance ${balanceData ? balanceData.balance : 0}`,
      font: {
        size: 26
      }
    },
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};
 //JSX rendering
  return (
    <div className=''>
      {error && <p>Error fetching balance: {error}</p>}
      {balanceData && (
        <>
          <div className="h-[400px] w-[400px] p-6 ml-[135px] antialiased mt-[52px] bg-white rounded-3xl drop-shadow-xl">
            <Doughnut data={chartData} options={chartOptions} />

          </div>
        </>
      )}
    </div>
  );
};

export default BalanceSummary;
