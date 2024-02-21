import { useState, useEffect } from 'react';
import axios from 'axios'

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response =  await axios.get('http://127.0.0.1:8000/api/transaction', { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.data;
      setTransactions(data);
    } catch (error) {
      setError(error.message);
    }
  };
const getCategoryName = (category) =>{
  return category ? category.name: 'Unkown';
}; 

  return (
    <div>
      <h2>Transactions</h2>
      {error && <p>Error fetching transactions: {error}</p>}
      {transactions.map((transaction) => (
        <div key={transaction.id} style={{ background: transaction.transaction_type === 'IN' ? 'lightgreen' : 'lightcoral', padding: '10px', marginBottom: '10px' }}>
          <p>
            <strong>ID:</strong> {transaction.id}
          </p>
          <p>
            <strong>Transaction Type:</strong> {transaction.transaction_type === 'IN' ? 'Income' : 'Expense'}
          </p>
          <p>
            <strong>Amount:</strong> {transaction.amount}
          </p>
          <p>
            <strong>Category:</strong> {getCategoryName(transaction.category)}
          </p>
          <p>
            <strong>Description:</strong> {transaction.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
