import { createContext, useState, useEffect } from 'react';
import axios from 'axios';


// Creating AuthContext
export const AuthContext = createContext();

// Creating AuthProvider component
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
      
      const token = localStorage.getItem('token');

      if (token) {
        const response = await axios.get('http://127.0.0.1:8000/api/check-auth', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        

        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Authentication check failed:', error.message);
    } finally {
      
      setLoading(false);
    }
  };

  // Run checkAuth on component mount
  useEffect(() => {
    
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
