import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
  // State to manage the user data
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

  // Function to handle user login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token)
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    
  };

  // Function to check if the user is authenticated (e.g., on page load)
  const checkAuth = async () => {
    try {
      console.log('Cheking authentication...');
      const token = localStorage.getItem('token');

      if (token) {
        const response = await axios.get('http://127.0.0.1:8000/api/check-auth', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('authentication successful:', response.data)

        setUser(response.data);
      }
    } catch (error) {
      console.error('Authentication check failed:', error.message);
    } finally {
      console.log('Authentication check completed');
      setLoading(false);
    }
  };

  // Run checkAuth on component mount
  useEffect(() => {
    console.log('AuthProvider mouted or updated');
    checkAuth();
  }, []);

  // The context value that will be provided to components
  const contextValue = {
    user,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
