import React from 'react';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import TransactionList from '../components/TransactionList';
import TransactionActions from '../components/TransactionActions';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

function ReportPage() {
  return (
    <div className="grid grid-cols-[208px_1fr] grid-rows-[95px_1fr] h-screen bg-gradient-to-r from-[#DDEFFA] to-[#C0DFF4]">
    <Sidebar />
    <Header title="Reports" />
    <div className="grid grid-cols-[auto_1fr]">
      <div className="h-[400px] w-[400px] p-6 ml-8 mt-8 bg-white rounded-3xl drop-shadow-xl">
        <Doughnut
          data={{
            labels: ['Salery', 'Business', 'Side Husstles'],
            datasets: [
              {
                label: '',
                data: [12, 19, 3],
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
                label: 'Salery',
                data: [1, 9, 13, 18, 20, 13, 17],
                backgroundColor: ['#D6A9E3']
              },
              {
                label: 'Business',
                data: [2, 6, 15, 8, 11, 7, 16],
                backgroundColor: ['#8BBEE9']
              },
              {
                label: 'Side Husstles',
                data: [4, 5, 3, 17, 8, 10, 7],
                backgroundColor: ['#9BF6FF']
              }
            ]
          }}
        />
      </div>
    </div>
  </div>
  );
}

export default ReportPage;
