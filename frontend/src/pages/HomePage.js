import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
    const { user, logout } = useContext(AuthContext);

    return(
        <div>
          <Header />
        <h2>Welcome to the Home Page</h2>
        {user ? (
          <div>
            <p>Hello, {user.username}!</p>
            
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <p>You are not logged in.</p>
        )}
        <Footer />
      </div>
    );
  };
  export default HomePage;    