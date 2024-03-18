import React from 'react';
import axios from 'axios';

function DeleteCategoryButton({ categoryId, onUpdateCategories }) {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onUpdateCategories(); // Update categories after deletion
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <button className="ml-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleDelete}>
      Delete
    </button>
  );
}

export default DeleteCategoryButton;

