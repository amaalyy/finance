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
    <div className="m-4 w-2/3 border border-gray-300 p-4 rounded flex flex-col relative">
      <div className="mb-4">
        {/* <span className="text-lg mr-2">ID: {id}</span> */}
        <span className="text-lg">Transaction Type: {transactionType === "IN" ? "Income" : "Expense"}</span>
      </div>
      <div className="mb-4">
        <span>Amount:</span>
        <span className={`ml-2 ${transactionColor}`}>TND{amount}</span>
      </div>
      <div className="mb-4">
        <span>Category: {category}</span>
      </div>
      <div className="mb-4">
        <span>Description: {description}</span>
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
        <button
          className="bg-red-500 text-white px-4 py-2 border border-red-600 rounded cursor-pointer mr-12"
          onClick={() => onDeleteClick(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
