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
import { Bar, Doughnut } from 'react-chartjs-2';
import Category from '../components/Category';

function NewCategory() {
  const [categories, setCategories] = useState([]);
  const onUpdateCategories = async () => {
    try {
      // Fetch the updated list of categories from the server
      const response = await axios.get('http://127.0.0.1:8000/api/categories');
      const updatedCategories = response.data;

      // Update the categories state with the new list of categories
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error updating categories:', error);
    }
  };

  return (
    <div className="grid grid-cols-[208px_1fr] grid-rows-[95px_1fr] h-screen bg-gradient-to-r from-[#DDEFFA] to-[#C0DFF4]">
      <Sidebar />
      <Header title="New Category" />
      <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <Category onUpdateCategories={onUpdateCategories} />
      </div>
    </div>
  );
}

export default NewCategory;
