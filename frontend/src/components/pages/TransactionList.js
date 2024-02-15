import React, { useState, useEffect } from 'react';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/transaction/');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Transactions</h2>
      {error && <p>Error fetching transactions: {error}</p>}
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <strong>ID:</strong> {transaction.id}, <strong>Description:</strong> {transaction.description}
            {/* Include other fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
