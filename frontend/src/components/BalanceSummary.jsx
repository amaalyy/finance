// BalanceSummary.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

const BalanceSummary = (forceRemount) => {
  const [balanceData, setBalanceData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/balance/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBalanceData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBalance();
  }, [forceRemount]);

  return (
    <Card title="Balance Summary">
      {error && <p>Error fetching balance: {error}</p>}
      {balanceData && (
        <div>
          <p>Total Income: TND {balanceData.total_income}</p>
          <p>Total Expense: TND {balanceData.total_expense}</p>
          <p>Balance: TND {balanceData.balance}</p>
        </div>
      )}
    </Card>
  );
};

export default BalanceSummary;
