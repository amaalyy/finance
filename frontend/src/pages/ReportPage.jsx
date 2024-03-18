import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut, Line } from 'react-chartjs-2';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';


function ReportPage() {
  const [incomeData, setIncomeData] = useState([]);
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
        const incomeResponse = await axiosInstance.get('/income-report/');
        const expenseResponse = await axiosInstance.get('/expense-report/');
        setIncomeData(incomeResponse.data);
        setExpenseData(expenseResponse.data);
      } catch (error) {
        console.log('Error fetching report data:', error);
      }
    }

    fetchReportData();
  }, []);

  // Function to generate random colors
  const getRandomColor = () => {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
  };


  return (
    <div className="grid grid-cols-[208px_1fr] grid-rows-[95px_1fr] h-screen bg-gradient-to-r from-[#DDEFFA] to-[#C0DFF4]">
      <Sidebar />
      <div className="">
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
                    backgroundColor: incomeData.map(() => getRandomColor()),
                    weight: 100,
                    borderWidth: 5,
                    hoverOffset: 4,
                  },
                ],
              }}
            />
          </div>
          <div className="h-[400px] w-[400px] p-6 ml-8 mt-8 bg-white rounded-3xl drop-shadow-xl">
            <Doughnut
              data={{
                labels: expenseData.map(item => item.category),
                datasets: [
                  {
                    label: '',
                    data: expenseData.map(item => parseFloat(item.total_amount)),
                    backgroundColor: incomeData.map(() => getRandomColor()),
                    weight: 100,
                    borderWidth: 5,
                    hoverOffset: 4,
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ReportPage;
