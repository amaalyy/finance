import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Category from '../components/Category';
import DeleteCategoryButton from '../components/DeleteCategoryButton'; // Import the DeleteCategoryButton component
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function NewCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    onUpdateCategories();
  }, []);

  const onUpdateCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/categories/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const categoriesData = response.data;
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error updating categories:', error);
    }
  };

  return (
    <div className="grid grid-cols-[208px_1fr] grid-rows-[95px_1fr] bg-gradient-to-r from-[#DDEFFA] to-[#C0DFF4]">
      <Sidebar />
      <Header title="New Category" />
      <div className="w-96 bg-white p-8 m-8 rounded-3xl drop-shadow-xl">
        <Category onUpdateCategories={onUpdateCategories} />
        <h2 className="mt-6 text-xl font-semibold antialiased">All Categories</h2>
        <ul>
          {categories.map(category => (
            <li key={category.id}>
              {category.name}
              <DeleteCategoryButton
                categoryId={category.id}
                onUpdateCategories={onUpdateCategories}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NewCategory;
