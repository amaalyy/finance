import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import TransactionList from '../components/TransactionList';
import TransactionActions from '../components/TransactionActions';
import axios from 'axios';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut } from 'react-chartjs-2';

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

  useEffect(() => {
    const getLastThreeTransaction = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://127.0.0.1:8000/api/transaction',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.data;
        const lastThree = data.slice(-3);
        setTransactions(lastThree);
      } catch (error) {
        setError(error.message);
      }
    };
  }, []);

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
      <Header title="Dashboard" />
      <div className="bg-cyan-100">
        <h2>Welcome to the Home Page</h2>
        {user ? (
          <div className="row-start-2">
            <p>Hello, you are logged in as {user.username}!</p>
            <TransactionActions onAddTransaction={handleAddTransaction} />
            <TransactionList />
            <p className="text-xl antialiased font-semibold ml-8 mt-4">
              Last Transaction
            </p>
            <div className="text-white antialiased grid grid-cols-[400px_400px_400px] mb-8 px-7 gap-8">
              <div className="h-[219px] bg-[#FE7097] p-6 mt-4 rounded-3xl ">
                <p className="text-[25px]">salery</p>
                <p className="text-[40px]">5000</p>
                <p className="text-[20px]">income</p>
              </div>
              <div className="h-[219px] bg-[#4FCBBC] p-6 mt-4 rounded-3xl">
                <p className="text-[25px]">rent</p>
                <p className="text-[40px]">200</p>
                <p className="text-[20px]">Expense</p>
              </div>
              <div className="h-[219px] bg-[#5EC1EE] p-6 mt-4 rounded-3xl">
                <p className="text-[25px]">food</p>
                <p className="text-[40px]">100</p>
                <p className="text-[20px]">Expense</p>
              </div>
            </div>
            <div className="grid grid-cols-[auto_1fr]">
              <div className="p-6 ml-8 h-[400px] w-[400px] bg-white rounded-3xl">
                <Doughnut
                  data={{
                    labels: ['Income', 'Expense', 'Balance'],
                    datasets: [
                      {
                        label: '',
                        data: [12, 19, 3],
                        backgroundColor: ['#5EC1EE', '#FE7097', '#4FCBBC'],
                        weight: 100,
                        borderWidth: 5,
                        hoverOffset: 4
                      }
                    ]
                  }}
                />
              </div>
              <dir className="w-[835px] h-[400px] p-5 ml-8 mt-0 bg-white rounded-3xl">
                <Bar
                  data={{
                    labels: ['Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [
                      {
                        label: '',
                        data: [12, 19, 3, 8, 8, 10, 7],
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(255, 159, 64, 0.2)',
                          'rgba(255, 205, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(201, 203, 207, 0.2)'
                        ]
                      },
                      {
                        label: '',
                        data: [12, 19, 3, 8, 8, 10, 7],
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(255, 159, 64, 0.2)',
                          'rgba(255, 205, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(201, 203, 207, 0.2)'
                        ]
                      }
                    ]
                  }}
                />
              </dir>
            </div>
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
