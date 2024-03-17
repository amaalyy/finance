import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TransactionList from '../components/TransactionList';
import TransactionActions from '../components/TransactionActions';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BalanceSummary from '../components/BalanceSummary';
import Sidebar from '../components/Sidebar';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut } from 'react-chartjs-2';

const HomePage = () => {
  const { user, loading } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  if (loading) {
    return <p>Loading...</p>;
  }

  const token = localStorage.getItem('token');
  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    }
  });

  useEffect(() => {
    const getLastThreeTransaction = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://127.0.0.1:8000/api/transaction',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.data;
        const lastThree = data.slice(-3);
        setTransactions(lastThree);
      } catch (error) {
        setError(error.message);
      }
    };

    getLastThreeTransaction();
  }, []);

  const handleAddTransaction = async (newTransaction) => {
    try {
      console.log('Adding transaction:', newTransaction);
      const response = await axiosInstance.post(
        '/transaction/',
        newTransaction
      );
      console.log('Transaction added successfully:', response.data);
      setTransactions([...transactions, response.data]);
    } catch (error) {
      console.error('Error adding transaction:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  // Define forceRemount function
  const [remountKey, setRemountKey] = useState(0);
  const forceRemount = () => setRemountKey((prevKey) => prevKey + 1);

  return (
    <div className="grid grid-cols-[208px_1fr] grid-rows-[95px_1fr] h-screen">
      <Sidebar />
      <Header title="Dashboard" />
      <div className="bg-gradient-to-r from-[#DDEFFA] to-[#C0DFF4]">
        {user ? (
          <div className="row-start-2">
            <p>Hello, you are logged in as {user.username}!</p>
            <p className="text-xl antialiased font-semibold ml-8 mt-4">
              Last Transaction
            </p>
            <div className="text-white antialiased grid grid-cols-[400px_400px_400px] mb-8 px-7 gap-8">
              <div className="relative h-[219px] p-6 mt-4 rounded-3xl bg-gradient-to-r from-[#FFBC95] to-[#FE7095] drop-shadow-xl">
                <div className="bg-no-repeat bg-right inset-0 absolute bg-[url('https://demo.bootstrapdash.com/purple/themes/assets/images/dashboard/circle.svg')]"></div>
                <p className="text-[25px]">salery</p>
                <p className="text-[40px]">5000</p>
                <p className="text-[20px]">income</p>
              </div>
              <div className="relative h-[219px] p-6 mt-4 rounded-3xl bg-gradient-to-r from-[#8EC8F8] to-[#047EDF] drop-shadow-xl">
                <div className="bg-no-repeat bg-right inset-0 absolute bg-[url('https://demo.bootstrapdash.com/purple/themes/assets/images/dashboard/circle.svg')]"></div>
                <p className="text-[25px]">rent</p>
                <p className="text-[40px]">200</p>
                <p className="text-[20px]">Expense</p>
              </div>
              <div className="relative h-[219px] p-6 mt-4 rounded-3xl bg-gradient-to-r from-[#83D8D1] to-[#0CCDAF] drop-shadow-xl">
                <div className="bg-no-repeat bg-right inset-0 absolute bg-[url('https://demo.bootstrapdash.com/purple/themes/assets/images/dashboard/circle.svg')]"></div>
                <p className="text-[25px]">food</p>
                <p className="text-[40px]">100</p>
                <p className="text-[20px]">Expense</p>
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <TransactionActions onAddTransaction={handleAddTransaction} />
              <BalanceSummary forceRemount={forceRemount} />
            </div>
            <TransactionList />
          </div>
        ) : (
          <p>You are not logged in.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
