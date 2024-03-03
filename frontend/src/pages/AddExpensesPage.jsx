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

function AddExpensesPage() {
  return (
    <div className="grid grid-cols-[208px_1fr] grid-rows-[95px_1fr] h-screen bg-teal-100">
      <Sidebar />
      <Header title="Expenses" />
      <div className="grid grid-cols-[400px_400px_400px] mb-8 px-8 gap-8 rounded-3xl">
        <div className="p-9 mt-8 grid bg-white rounded-3xl">
          <Doughnut
            data={{
              labels: [
                'Housing',
                'Transportation',
                'Food',
                'Utilities',
                'Clothing'
              ],
              datasets: [
                {
                  label: '',
                  data: [12, 19, 3, 9, 7],
                  backgroundColor: [
                    '#FFC6FE',
                    '#A0C4FF',
                    '#9BF6FF',
                    '#CAFEBF',
                    '#FCFFB6'
                  ],
                  weight: 100,
                  borderWidth: 5,
                  hoverOffset: 4
                }
              ]
            }}
          />
        </div>
        <div className="p-6 mt-8 grid bg-white rounded-3xl">
          <Doughnut
            data={{
              labels: [
                'Medical/Healthcare',
                'Insurance',
                'Household Supplies',
                'Personal',
                'Debt'
              ],
              datasets: [
                {
                  label: '',
                  data: [12, 19, 3, 9, 7],
                  backgroundColor: [
                    '#FFC6FE',
                    '#A0C4FF',
                    '#9BF6FF',
                    '#CAFEBF',
                    '#FCFFB6'
                  ],
                  weight: 100,
                  borderWidth: 5,
                  hoverOffset: 4
                }
              ]
            }}
          />
        </div>
        <div className="p-9 mt-8 grid bg-white rounded-3xl">
          <Doughnut
            data={{
              labels: [
                'Retirement',
                'Education',
                'Savings',
                'Gifts',
                'Entertainment'
              ],
              datasets: [
                {
                  label: '',
                  data: [12, 19, 3, 9, 7],
                  backgroundColor: [
                    '#FFC6FE',
                    '#A0C4FF',
                    '#9BF6FF',
                    '#CAFEBF',
                    '#FCFFB6'
                  ],
                  weight: 100,
                  borderWidth: 5,
                  hoverOffset: 4
                }
              ]
            }}
          />
        </div>
        <div className="w-[835px] h-[400px] p-5 mt-0 mx-auto col-span-full bg-white rounded-3xl">
          <Line
            data={{
              labels: ['Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [
                {
                  label: '',
                  data: [12, 19, 3, 8, 8, 10, 7],
                  backgroundColor: ['#5EC1EE', '#FE7097', '#4FCBBC']
                }
              ]
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AddExpensesPage;
