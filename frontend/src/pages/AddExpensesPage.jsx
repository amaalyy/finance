import React from 'react';
import { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

function AddExpensesPage() {
  const [expenseData, setExpenseData] = useState([]);

  const token = localStorage.getItem('token');
  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
  });
  useEffect(() => {
    async function fetchReportData() {
      try {
        const expenseResponse = await axiosInstance.get('/expense-report/');
        setExpenseData(expenseResponse.data);
      } catch (error) {
        console.log('Error fetching report data:', error);
      }
    }

    fetchReportData();
  }, []);

  const renderCharts = () => {
    const colors = ['#FFC6FE', '#A0C4FF', '#9BF6FF', '#CAFEBF', '#FCFFB6'];
    const charts = [];
    let chunkIndex = 0;

    for (let i = 0; i < expenseData.length; i += 5) {
      const chunk = expenseData.slice(i, i + 5);
      const chartData = {
        labels: chunk.map((item) => item.category),
        datasets: [
          {
            label: '',
            data: chunk.map((item) => parseFloat(item.total_amount)),
            backgroundColor: colors,
            weight: 100,
            borderWidth: 5,
            hoverOffset: 4
          }
        ]
      };

      charts.push(
        <div key={chunkIndex}>
          <Doughnut data={chartData} />
        </div>
      );

      chunkIndex++;
    }

    return charts;
  };

  return (
    <div className="grid grid-cols-[208px_1fr] grid-rows-[95px_1fr] bg-gradient-to-r from-[#DDEFFA] to-[#C0DFF4]">
      <Sidebar />
      <Header title="Expenses" />
      <div className="mb-8 px-8 rounded-3xl">
        <div className="grid grid-cols-[400px_400px_400px] gap-8 p-9 mt-8 bg-white rounded-3xl drop-shadow-xl">
          {renderCharts()}
        </div>
      </div>
    </div>
  );
}

export default AddExpensesPage;
