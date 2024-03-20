import React, { useState } from 'react';
import axios from 'axios';

const Category = ({ onUpdateCategories }) => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(null);

  const handleAddCategory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://127.0.0.1:8000/api/categories/',
        { name: categoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 201) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // If category is added successfully, update categories
      onUpdateCategories();
      // Clear input field
      setCategoryName('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='mt-5'>
      <h3>Add New Category</h3>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Category Name"
      />
      <button onClick={handleAddCategory}>Add Category</button>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Category;
