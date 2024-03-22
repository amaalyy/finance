import { AuthContext } from '../contexts/AuthContext';
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

const LastThree = ({ forceRemount }) => {
const [lastThree, setLastThree] = useState([]);
const [error, setError] = useState(null);
useEffect(() => {

const getLastThreeTransaction = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://127.0.0.1:8000/api/transaction/',
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {
              page: 1,
              page_size: 3
            }
          }
        );
        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.data;
        setLastThree(data.results);
      } catch (error) {
        setError(error.message);
      }
    };

    getLastThreeTransaction();
  }, [forceRemount]);


    return (
      <>
      <p className="text-xl antialiased font-semibold ml-8 mt-4">
              Last Transactions
            </p>
      <div className="text-white antialiased grid grid-cols-[400px_400px_400px] mb-8 px-7 gap-8">
              {lastThree.map((transaction, index) => (
                <div key={index} className="relative h-[219px] p-6 mt-4 rounded-3xl bg-gradient-to-r from-[#8EC8F8] to-[#047EDF] drop-shadow-xl">
                  <div className="bg-no-repeat bg-right inset-0 absolute bg-[url('https://demo.bootstrapdash.com/purple/themes/assets/images/dashboard/circle.svg')]"></div>
                  <p className="text-[25px]">{transaction.category_name}</p>
                  <p className="text-[40px]">{transaction.amount}</p>
                  <p className="text-[20px]">{transaction.transaction_type === 'EX' ? 'Expense' : 'Income'}</p>
                </div>
              ))}

            </div>
            </>
    );
};
    export default LastThree;
