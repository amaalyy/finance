// TransactionActions.js
import React, { useState } from 'react';
import TransactionForm from './TransactionForm'; // Import the TransactionForm component

const TransactionActions = ({ onAddTransaction }) => {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <button onClick={handleToggleForm}>
        {showForm ? 'Hide Form' : 'Add New Transaction'}
      </button>
      {showForm && <TransactionForm onAddTransaction={onAddTransaction} />}
    </div>
  );
};

export default TransactionActions;
