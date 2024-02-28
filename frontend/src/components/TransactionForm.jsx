import { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionForm = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [transactionType, setTransactionType] = useState(''); // Assuming transactionType is a state variable
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
      console.log(response);
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
      transaction_type: transactionType, // corrected variable name
    };

    // Call the callback function from the parent component
    onAddTransaction(newTransaction);

    // Clear input fields
    setDescription('');
    setAmount('');
    setCategory('');
    setTransactionType(''); // Clear transaction_type if needed
  };

  return (
    <div>
      <h3>Add New Transaction</h3>
      <label>
        Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Transaction Type:
        <input
          type="text"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        />
      </label>
      <button onClick={handleAddTransaction}>Add Transaction</button>
    </div>
  );
};

export default TransactionForm;
