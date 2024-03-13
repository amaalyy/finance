import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionItem from './TransactionItem';

const TransactionList = ({ forceRemount }) => {

  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/transaction/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTransactions();
  }, [forceRemount]);


  const handelDeleteClick = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/transaction/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.id !== id));

    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div>
      <h2>Transactions</h2>
      {error && <p>Error fetching transactions: {error}</p>}
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          id={transaction.id}
          transactionType={transaction.transaction_type}
          amount={transaction.amount}
          category={transaction.category_name}
          description={transaction.description}
          onDeleteClick={handelDeleteClick}
        />
      ))}
    </div>
  );
};

export default TransactionList;
