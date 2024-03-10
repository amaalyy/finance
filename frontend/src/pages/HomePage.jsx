import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TransactionList from '../components/TransactionList'
import TransactionActions from '../components/TransactionActions'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import BalanceSummary from '../components/BalanceSummary';





const HomePage = () => {
    const { user, logout, loading } = useContext(AuthContext);
    const [transactions, setTransactions] = useState([]);
    const [forceRemount, setForceRemount] = useState(0);
    console.log('user in HomePage');
    if (loading) {
      return <p>Loading...</p>
    }
    const token = localStorage.getItem('token');
    const axiosInstance = axios.create({
      baseURL: 'http://127.0.0.1:8000/api/',
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      }
    })

    const handleAddTransaction = async (newTransaction) => {
      try {
        console.log('Adding trransaction:', newTransaction);
        const response = await axiosInstance.post('/transaction/',newTransaction);
        console.log('Transaction added successfully:', response.data);
        setTransactions([...transactions, response.data]);
        setForceRemount((prevForceRemount) => prevForceRemount + 1);
      } catch (error) {
        console.error('Error adding transaction:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
        }
      }
    }
    const navigate = useNavigate();
    useEffect(() => {
      if (!user) {
        navigate('/login');
      }
    }, [logout]);
    return(
        <div>
          <Header />
        <h2>Welcome to the Home Page</h2>
        {user ? (
          <div>
            <p>Hello, you are logged in as {user.username}!</p>
            <BalanceSummary forceRemount={forceRemount} />
            <TransactionActions onAddTransaction={handleAddTransaction} />
            <TransactionList updatedTransactions={transactions} forceRemount={forceRemount}/>
            
            
          </div>
        ) : (
          <p>You are not logged in.</p>
        )}
        <Footer />
      </div>
    );
  };
  export default HomePage;    
