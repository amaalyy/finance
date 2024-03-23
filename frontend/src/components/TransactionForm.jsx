import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionForm = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  // useEffect hook to fetch categories
  useEffect(() => {
    getCategory();
  }, []);

// Function to fetch categories
  const getCategory = async () => {
    try {
      const token = localStorage.getItem('token');
      // Making GET request to fetch categories
      const response = await axios.get('http://127.0.0.1:8000/api/categories', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.data;
      setCategories(data);
    } catch (error) {
      setError(error.message);
    }
  };

   // Function to handle adding transaction
  const handleAddTransaction = () => {
    // Validate input fields
    if (!description || !amount || !category || !transactionType) {
      alert('Please fill in all fields');
      return;
    }

    // Convert amount to number
    const transactionAmount = parseFloat(amount);

    // Create a new transaction object
    const newTransaction = {
      description,
      amount: transactionAmount,
      category,
      transaction_type: transactionType
    };

    // Call the callback function from the parent component
    onAddTransaction(newTransaction);

    // Clear input fields
    setDescription('');
    setAmount('');
    setCategory('');
    setTransactionType('EX');
  };

  return (
    <div className="ml-8 antialiased">
      <h3 className="mb-6 text-xl font-semibold">Add New Transaction</h3>
      <div className="w-[830px] h-[400px] px-11 py-5 grid grid-rows-[1fr_1fr_1fr_1fr] mb-4 bg-white rounded-3xl drop-shadow-xl">
        <label className="mb-2 text-lg">
          <div className="my-2 font-medium">Description</div>
          <input
            className="w-[450px] h-[40px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2DDA9B]"

            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="text-lg">
          <div className="my-2 font-medium">Amount</div>
          <input
            className="w-[450px] h-[40px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2DDA9B]"

            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label className="text-lg">
          <div className="my-2 font-medium">Category</div>
          <select
            className="w-[450px] h-[40px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2DDA9B]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value=""></option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-lg">
          <div className="my-2 font-medium">Transaction Type</div>
          <select
            className="w-[450px] h-[40px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2DDA9B]"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value=""></option>
            <option value="EX">Expense </option>
            <option value="IN">Income </option>
          </select>
        </label>
        <button className="rounded-full w-52 p-3 bg ml-6 bg-[#2DDA9B] text-white hover:bg-[#2dda9bcf] -translate-y-[45px] translate-x-[480px]" onClick={handleAddTransaction}>
          Add Transaction
        </button>
      </div>
    </div>
  );
};

export default TransactionForm;
