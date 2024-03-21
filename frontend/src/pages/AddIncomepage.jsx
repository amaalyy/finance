import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line, Doughnut } from 'react-chartjs-2';

const AddIncomepage = () => {
  const [incomeData, setIncomeData] = useState([]);

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
        const incomeResponse = await axiosInstance.get('/income-report/');
        setIncomeData(incomeResponse.data);
      } catch (error) {
        console.log('Error fetching report data:', error);
      }
    }

    fetchReportData();
  }, []);
  
  return (
    <div className="grid grid-cols-[208px_1fr] grid-rows-[95px_1fr] bg-gradient-to-r from-[#DDEFFA] to-[#C0DFF4]">
      <Sidebar />
      <Header title="Income" />
      <div className="grid grid-cols-[auto_1fr]">
        <div className="h-[400px] w-[400px] p-6 ml-8 mt-8 bg-white rounded-3xl drop-shadow-xl">
          <Doughnut
            data={{
              labels: incomeData.map(item => item.category),
              datasets: [
                {
                  label: '',
                  data: incomeData.map(item => parseFloat(item.total_amount)),
                  backgroundColor: ['#FFC6FE', '#A0C4FF', '#9BF6FF'],
                  weight: 100,
                  borderWidth: 5,
                  hoverOffset: 4
                }
              ]
            }}
          />
        </div>
        <div className="w-[780px] h-[400px] p-5 ml-8 mt-8 bg-white rounded-3xl drop-shadow-xl">
          <Line
            data={{
              labels: ['Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [
                {
                  label: incomeData.map(item => item.category),
                  data: incomeData.map(item => parseFloat(item.total_amount)),
                  backgroundColor: ['#FFC6FE', '#A0C4FF', '#9BF6FF']
                },
              ]
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddIncomepage;
