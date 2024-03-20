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
import TransactionForm from '../components/TransactionForm';
import LastThree from '../components/LastThree';

const HomePage = () => {
  const { user, loading } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
 

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
            <LastThree forceRemount={forceRemount} />
            <div className='grid grid-cols-2'>
              <TransactionForm onAddTransaction={handleAddTransaction} />
              <BalanceSummary forceRemount={forceRemount} />
            </div>
            <TransactionList forceRemount={forceRemount}/>
          </div>
        ) : (
          <p>You are not logged in.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
