import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionItem from './TransactionItem';


// Functional component TransactionList
const TransactionList = ({ forceRemount }) => {
   // State variables
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);


  // useEffect hook to fetch transactions
  useEffect(() => {
     // Asynchronous function to fetch transactions
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        // Making GET request to fetch transactions
        const response = await axios.get(
          'http://127.0.0.1:8000/api/transaction/',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setTransactions(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTransactions();
  }, [forceRemount]);// Dependency array containing forceRemount variable

    // Function to handle delete click event
  const handelDeleteClick = async (id) => {
    try {
      const token = localStorage.getItem('token');  // Retrieving token from localStorage
      // Making DELETE request to delete transaction by id
      await axios.delete(`http://127.0.0.1:8000/api/transaction/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Updating transactions state by filtering out the deleted transaction
      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <h2 className="text-xl antialiased font-semibold ml-8 my-8">
        Transactions
      </h2>
       {/* Display error message if error state is not null */}
      {error && <p>Error fetching transactions: {error}</p>}
      {/* Container for displaying transaction items */}
      <div className='grid grid-cols-[400px_400px_400px] gap-8 mb-8'>
         {/* Mapping over transactions array to render each transaction item */}
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
    </div>
  );
};

export default TransactionList;
