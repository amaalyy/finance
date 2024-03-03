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
import { Line, Doughnut } from 'react-chartjs-2';

const AddIncomepage = () => {
  return (
    <div className="grid grid-cols-[208px_1fr] grid-rows-[95px_1fr] h-screen bg-teal-100">
      <Sidebar />
      <Header title="Income" />
      <div className="grid grid-cols-[auto_1fr]">
        <div className="h-[400px] w-[400px] p-6 ml-8 mt-8 bg-white rounded-3xl">
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
        <div className="w-[835px] h-[400px] p-5 ml-8 mt-8 bg-white rounded-3xl">
          <Line
            data={{
              labels: ['Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [
                {
                  label: '',
                  data: [12, 19, 3, 8, 8, 10, 7],
                  backgroundColor: ['#D6A9E3', '#8BBEE9', '#A8D4B9']
                }
              ]
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddIncomepage;
