import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import TransactionList from '../components/TransactionList';
import TransactionActions from '../components/TransactionActions';
import axios from 'axios';

const HomePage = () => {
  const { user, loading } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  console.log('user in HomePage');
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
      console.log('Adding trransaction:', newTransaction);
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
  return (
    <div className="grid grid-cols-[208px_1fr] grid-rows-[95px_1fr] h-screen">
      <Sidebar />
      <Header />
      
      <div>
        <h2>Welcome to the Home Page</h2>
        {user ? (
          <div className="row-start-2">
            <p>Hellfo, you are logged in as {user.username}!</p>
            <TransactionActions onAddTransaction={handleAddTransaction} />
            <TransactionList />
          </div>
        ) : (
          <p>You are not logged in.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};
export default HomePage;
