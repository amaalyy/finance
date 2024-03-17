import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionForm = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      transaction_type: transactionType,
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
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-xl font-semibold mb-4">Add New Transaction</h3>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description:
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
          Amount:
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
          Category:
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">---------------</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transactionType">
          Transaction Type:
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="transactionType"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="">----------</option>
            <option value="EX">Expense</option>
            <option value="IN">Income</option>
          </select>
        </label>
      </div>
      <div className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      <button
        
        onClick={handleAddTransaction}
      >
        Add Transaction
      </button>
      </div>
    </div>
  );
};

export default TransactionForm;
