import React from "react";

const TransactionItem = ({
  id,
  transactionType,
  amount,
  category,
  description,
  onDeleteClick,
}) => {
  const transactionColor = transactionType === "IN" ? "text-green-500" : "text-red-500";

  return (
    <div className="mx-8 my-8 grid grid-rows-[1fr_1fr_1fr_1fr] bg-white p-4 rounded-3xl drop-shadow-xl w-[400px] antialiased">
      <div className="mb-4">
        {/* <span className="text-lg mr-2">ID: {id}</span> */}
        <span className="text-lg font-medium">Transaction Type: {transactionType === "IN" ? "Income" : "Expense"}</span>
      </div>
      <div className="mb-4">
        <span className="text-lg font-medium">Amount:</span>
        <span className={`ml-2 ${transactionColor}`}>TND{amount}</span>
      </div>
      <div className="mb-4">
        <span className="text-lg font-medium">Category: {category}</span>
      </div>
      <div className="mb-4">
        <span className="text-lg font-medium">Description: {description}</span>
      </div>
      <div className="right-0 top-1/2 transform -translate-y-1/2">
        <button
          className="bg-red-500 text-white px-4 py-2 border border-red-600 rounded cursor-pointer"
          onClick={() => onDeleteClick(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
