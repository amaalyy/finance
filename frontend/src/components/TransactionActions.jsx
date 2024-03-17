// TransactionActions.js
import { useState } from 'react';
import TransactionForm from './TransactionForm'; // Import the TransactionForm component

const TransactionActions = ({ onAddTransaction }) => {
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <button className='rounded-full p-3 bg ml-6 bg-[#2DDA9B] text-white hover:bg-[#2dda9bcf] mb-6' onClick={handleToggleForm}>
        {showForm ? 'Hide Form' : 'Add New Transaction'}
      </button>
      {showForm && <TransactionForm onAddTransaction={onAddTransaction} />}
    </div>
  );
};

export default TransactionActions;
