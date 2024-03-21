import React from 'react';
import axios from 'axios';

function DeleteCategoryButton({ categoryId, onUpdateCategories }) {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onUpdateCategories(); // Update categories after deletion
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className='antialiased'>
      <button
        className="bg-red-500 text-white px-4 py-2 border border-red-700 hover:bg-red-600 rounded"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteCategoryButton;
