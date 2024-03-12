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
    <div className="grid grid-cols-[208px_1fr] grid-rows-[95px_1fr] bg-gradient-to-r from-[#DDEFFA] to-[#C0DFF4]">
      <Sidebar />
      <Header title="Expenses" />
      <div className="grid grid-cols-[400px_400px_400px] mb-8 px-8 gap-8 rounded-3xl">
        <div className="p-9 mt-8 grid bg-white rounded-3xl drop-shadow-xl">
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
        <div className="w-[780px] h-[400px] col-span-2 p-5 mt-8 bg-white rounded-3xl drop-shadow-xl">
          <Line
            data={{
              labels: ['Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [
                {
                  label: 'Housing',
                  data: [1, 9, 13, 18, 20, 13, 17],
                  backgroundColor: ['#D6A9E3']
                },
                {
                  label: 'Transportation',
                  data: [2, 6, 15, 8, 11, 7, 16],
                  backgroundColor: ['#8BBEE9']
                },
                {
                  label: 'Food',
                  data: [4, 5, 3, 17, 8, 10, 7],
                  backgroundColor: ['#9BF6FF']
                },
                {
                  label: 'Utilities',
                  data: [9, 5, 1, 14, 10, 11, 9],
                  backgroundColor: ['#CAFEBF']
                },
                {
                  label: 'Clothing',
                  data: [7, 4, 8, 7, 18, 1, 14],
                  backgroundColor: ['#FCFFB6']
                }
              ]
            }}
          />
        </div>
        <div className="p-6 grid bg-white rounded-3xl drop-shadow-xl">
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
        <div className="w-[780px] h-[400px] col-span-2 p-5 bg-white rounded-3xl drop-shadow-xl">
          <Line
            data={{
              labels: ['Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [
                {
                  label: 'Medical/Healthcare',
                  data: [1, 9, 13, 18, 20, 13, 17],
                  backgroundColor: ['#D6A9E3']
                },
                {
                  label: 'Insurance',
                  data: [2, 6, 15, 8, 11, 7, 16],
                  backgroundColor: ['#8BBEE9']
                },
                {
                  label: 'Household Supplies',
                  data: [4, 5, 3, 17, 8, 10, 7],
                  backgroundColor: ['#9BF6FF']
                },
                {
                  label: 'Personal',
                  data: [9, 5, 1, 14, 10, 11, 9],
                  backgroundColor: ['#CAFEBF']
                },
                {
                  label: 'Debt',
                  data: [7, 4, 8, 7, 18, 1, 14],
                  backgroundColor: ['#FCFFB6']
                }
              ]
            }}
          />
        </div>
        <div className="p-9 grid bg-white rounded-3xl drop-shadow-xl">
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
        <div className="w-[780px] h-[400px] p-5 bg-white rounded-3xl drop-shadow-xl">
          <Line
            data={{
              labels: ['Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [
                {
                  label: 'Retirement',
                  data: [1, 9, 13, 18, 20, 13, 17],
                  backgroundColor: ['#D6A9E3']
                },
                {
                  label: 'Education',
                  data: [2, 6, 15, 8, 11, 7, 16],
                  backgroundColor: ['#8BBEE9']
                },
                {
                  label: 'Savings',
                  data: [4, 5, 3, 17, 8, 10, 7],
                  backgroundColor: ['#9BF6FF']
                },
                {
                  label: 'Gifts',
                  data: [9, 5, 1, 14, 10, 11, 9],
                  backgroundColor: ['#CAFEBF']
                },
                {
                  label: 'Entertainment',
                  data: [7, 4, 8, 7, 18, 1, 14],
                  backgroundColor: ['#FCFFB6']
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
