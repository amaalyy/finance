// TransactionForm.js
import React, { useState } from 'react';

const TransactionForm = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [transaction_type, setTransactionType] = useState(''); // Assuming transaction_type is a state variable

  const handleAddTransaction = () => {
    // Validate input fields
    if (!description || !amount || !category || !transaction_type) {
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
      transaction_type,
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
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </label>
      <label>
        Transaction Type:
        <input
          type="text"
          value={transaction_type}
          onChange={(e) => setTransactionType(e.target.value)}
        />
      </label>
      <button onClick={handleAddTransaction}>Add Transaction</button>
    </div>
  );
};

export default TransactionForm;
